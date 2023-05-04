import express from "express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import Apollo from "apollo-server-express";
import dotenv from "dotenv";
import expressSession from "express-session";
import compression from "compression";
//import CJ from "cron"
import morgan from "morgan";
import fs from "fs";
import { __dirname } from "../varCJS.js";
import depthLimit from "graphql-depth-limit";
import complexity from "graphql-validation-complexity";
import helmet from "helmet";
import https from "https";
import http from "http";
import spdy from "spdy";
// import passport from "passport"

import * as handlers from "./lib/handlers.js";
import checkIdMiddleware from "./lib/middleware/idControlCheck.js";
import logger from "./lib/importantLog.js";
import db from "./db.js";
import handleRoutes from "./routes.js";
import checkSecure from "./lib/middleware/checkSecure.js";
import resolvers from "./resolvers/index.js";
import { setContext } from "./lib/setServer.js";
import agenda from "./agenda.js";

dotenv.config();
const port = process.env.PORT || 8080;
const sport = process.env.SPORT || 3443;
const { DB_HOST: dbHost } = process.env;
// периодическое выполнение работы, после подключения Mongo
// попробовать использование agenda
// const job = new CJ.CronJob(
//     // время "мин ч * * * деньнед"
//     "1 * * * * *",
//     () => console.log('You will see this message every 2 min'),
//     ()=> console.log("Message from cron was show"),
//     true,
//     -180
// )

const typeDefs = fs.readFileSync("./src/typeDefs.graphql", "utf-8");
// ws принимает только один параметр - схему, в других случаях можно отдельно закидывать
// резолверы и схему, как в данном случае сделано
//const schema = makeExecutableSchema({typeDefs, resolvers})
logger("serve", "Starting server");

const app = express();
db.connect(dbHost);
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'unsafe-inline'", "finevideo.ru", "localhost"],
        "script-src": ["'unsafe-inline'", "finevideo.ru", "localhost"]
      }
    }
  })
);

// app.engine("handlebars", HB.engine({
//     defaultLayout: "main"
// }))
// app.set("view engine", "handlebars")
// app.set("views", "./views" )
// // включено по умолчанию в prod среде
// app.set("view cache", true)

morgan.token("id", function getId(req) {
  const { clientid } = req.headers;
  return clientid || "anon";
});
morgan.token("rus-date", function getId() {
  return new Date().toLocaleString();
});
switch (app.get("env")) {
  case "development":
    app.use(
      morgan(
        ":id :method :url :status :response-time ms - :res[content-length]",
        {
          skip: (req, res) => /^\/(style|img)/.test(req.path)
        }
      )
    );
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", {
      // данный флаг указывает на добавление новых данных в конец док-та (in append mode)
      flags: "a"
    });
    app.use(
      morgan(
        ':remote-addr - :remote-user [:rus-date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        { stream }
      )
    );
    break;
}

// app.use((req, res, next)=>{
//     // проверка на предустановленный заголовок безопасного
//     // соединения с прокси-сервером NGINX
//     if(req.header["x-forwarded-proto"]==="https")
//         console.log(`line is secure`)
//     else {
//         // проверка на безопасное соединения
//         console.log(req.secure)
//         console.log("line is not secure!")
//     }
//     next()
// })
app.use(compression());
// MW устанавливает ложный заголовок сервера
app.use((_req, res, next) => {
  res.set("X-Powered-By", "PHP 4.2.2");
  next();
});
// д/получения доступа к req.body
// app.use(
//   expressSession({
//     name: "server-session-1",
//     resave: false,
//     saveUninitialized: false,
//     secret: cookieSecret,
//     cookie: {
//       // cookie живет ровно сутки с момента установления значения
//       maxAge: 86400000
//     }
//   })
// );

app.use(checkIdMiddleware());
app.use(express.static("./public"));
app.use(checkSecure());

const options = {
  key: fs.readFileSync(__dirname + "/ssl/finevideo.pem"),
  cert: fs.readFileSync(__dirname + "/ssl/finevideo.crt")
};

const httpsServer = spdy.createServer(options, app);
httpsServer.timeout = 5000;

const httpServer = http.createServer(app);
httpsServer.timeout = 5000;

const server = new Apollo.ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  // InMemoryCache включен при данной установке по умолчанию
  cache: "bounded",
  validationRules: [depthLimit(15), complexity.createComplexityLimitRule(1000)],
  cors: {
    origin: true
  },
  context: setContext
});
// необходимая обработка неперехваченных исключений
process.on("uncaughtException", async (err) => {
  console.error("НЕПЕРЕХВАЧЕННОЕ ИСКЛЮЧЕНИЕ\n", err.stack);
  logger("ERROR", {
    name: "PROCESS",
    err
  });
  // действия по очистке данных, закрытия соединения с БД
  await agenda.close({ force: true });
  db.close();
  process.exit(1);
});

(async function () {
  await server.start();
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));
  server.applyMiddleware({ app, path: "/api" });
  // маршруты д.б. после подключения middleware graphql!
  handleRoutes(app);
  app.use(handlers.notFound());
  app.use(handlers.serverError());
  // обычно https не применяется на сервере приложения, оно используется на
  // прокси-сервере NGINX, обрабатывающим все входящие соединения
  httpsServer.listen({ port: sport }, () => {
    logger(
      "serve",
      `Start on https://localhost:${sport} in ${app.get("env")} mode.`
    );
    console.log(
      `Express запущен на https://localhost:${sport} ` +
        `с защитой соединения, ` +
        `в режиме ${app.get("env")}.`
    );
  });
  httpServer.listen({ port }, () => {
    logger(
      "serve",
      `Start on http://localhost:${port} in ${app.get("env")} mode.`
    );
    console.log(
      `Express запущен на http://localhost:${port} ` +
        `в режиме ${app.get("env")}, ` +
        `нажмите Ctrl+C для завершения.`
    );
  });
})();
