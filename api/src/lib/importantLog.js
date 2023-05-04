import fs from "fs";
import { __dirname } from "../../varCJS.js";
import models from "../models/index.js";

const mainstream = fs.createWriteStream(__dirname + "/start.log", {
  flags: "a"
});

const serializeLog = async (type, data) => {
  const { name, clientid, optns } = data;
  switch (type) {
    case "serve":
      addLog(data);
      break;
    case "POST":
      const { obj } = data;
      const arrData = [];
      for (let key in obj) {
        arrData.push(`${key}: ${obj[key]}`);
      }
      addLog(
        `Получен POST запрос <${name}> ${arrData.join(", ")} ${
          clientid && clientid
        } ${optns && optns}`
      );
      break;
    case "ERROR":
      const { err } = data;
      await models.ServerError.create({
        message: err.message,
        place: name,
        stack: err.stack,
        addition: optns
      });
      addLog(`Произошла ОШИБКА <${name}> ${err.stack}`);
      break;
    case "MAIL":
      const {
        obj: { to }
      } = data;
      addLog(`Письмо <${name}> для ${to} отправлено успешно.`);
      break;
  }
};

const addLog = (data) => {
  try {
    const toWrite = `${new Date().toLocaleString()} - ${data.toString()}\n`;
    mainstream.write(toWrite, "utf-8");
  } catch (e) {
    console.error("Ошибка при записи важного лога", e);
  }
};

export default serializeLog;
