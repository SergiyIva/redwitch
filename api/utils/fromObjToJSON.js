import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainstream = fs.createWriteStream(__dirname + "/fromObj.json", {
  flags: "a"
});

// добавь сюда данные
const data = {
  main: [
    {
      href: "/admin",
      title: "Панель управления"
    },
    {
      href: "/admin/orders",
      title: "Заказы"
    },
    {
      href: "/admin/products",
      title: "Витрина"
    },
    {
      href: "/admin/send-mail",
      title: "Рассылка"
    },
    {
      href: "#",
      title: "Промокоды"
    },
    {
      href: "#",
      title: "Integrations"
    }
  ],
  statistic: [
    {
      href: "#",
      title: "Текущий месяц"
    },
    {
      href: "#",
      title: "Последние 3 месяца"
    },
    {
      href: "#",
      title: "За год"
    },
    {
      href: "#",
      title: "За все время"
    }
  ]
};

// запуск > node ./utils/fromObjToJSON.js

const objJson = JSON.stringify(data);

mainstream.write(objJson, "utf-8");
