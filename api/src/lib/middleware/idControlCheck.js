import { v4 } from "uuid";
import models from "../../models/index.js";
import agenda from "../../agenda.js";

let checkedId = {};

agenda.define("clear cash-id", (job) => {
  checkedId = {};
  console.log("Cleaned IDs");
});

agenda.define("say check", (job) => {
  console.log("Check agenda!");
});

(async function () {
  const clear = agenda.create("clear cash-id");
  //const check = agenda.create("say check");
  await agenda.start();
  // 00:00 по нашему
  await clear.repeatAt("0:00am");
  // await check.repeatEvery("30 seconds", {
  //   // не работает на node v13 из-за синтаксиса исходного кода
  //   startDate: new Date("12.09.2022 15:20"),
  //   skipImmediate: true
  // });
  // save() выполняется каждый раз при перезапуске сервера с созд нов задачи в дб,
  // при этом без удаления/замены старой
  // await check.save();
  //await clear.save();
  //await agenda.every("30 seconds", "say check");
})();

const makeNewSess = async (req, clientId) => {
  const session = await models.Session.create({
    ip: req.socket.remoteAddress,
    platform: req.headers["sec-ch-ua-platform"].replace(/"/g, ""),
    userAgent: req.headers["user-agent"],
    startedAt: new Date(),
    clientId
  });
  checkedId[clientId] = session._id;
};

const getCurrentSession = (clientid) => {
  return models.Session.find({
    clientId: clientid
  })
    .limit(1)
    .sort({ _id: -1 });
};

const checkIdMiddleware = () => async (req, res, next) => {
  const { clientid } = req.headers;
  if (clientid) {
    if (req.method === "GET") console.log(req);
    if (!checkedId[clientid]) {
      const currentSession = getCurrentSession(clientid);

      if (currentSession.length) {
        const session = currentSession[0];
        const fixDate = new Date(new Date(session.startedAt).toDateString());
        if (Date.now() - fixDate > 86400000) {
          await makeNewSess(req, clientid);
        } else {
          await models.Session.updateOne(
            { _id: session._id },
            { $inc: { visitCount: 1 } }
          );
          checkedId[clientid] = session._id;
        }
      } else {
        await makeNewSess(req, clientid);
      }
    } else {
      await models.Session.updateOne(
        { _id: checkedId[clientid] },
        { $inc: { visitCount: 1 } }
      );
    }
  }
  next();
};

export default checkIdMiddleware;
