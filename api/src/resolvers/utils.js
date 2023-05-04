import mgfs from "mongoose-gridfs";
import dotenv from "dotenv";
import logger from "../lib/importantLog.js";
import mongoose from "mongoose";
import { __dirname } from "../../varCJS.js";
import path from "path";
import uid from "uid-safe";
import { createWriteStream } from "fs";

dotenv.config();

const mainUrl = process.env.HOST;

export const uploadFile = async (file) => {
  const { createReadStream, filename, mimetype, encoding, capacitor } =
    await file;

  const stream = createReadStream();
  // работа с потоком чтения
  //GridFS загрузка файлов, рабочий в-т
  const Attachment = mgfs.createModel();
  const options = { filename, contentType: mimetype };
  const some = Attachment.write(options, stream, (error, file) => {
    if (error) {
      logger("ERROR", {
        name: "uploadFile",
        error
      });
      console.log(error);
    } else {
      console.log(file);
    }
  });
  console.log("---------------file written!\n", filename, mimetype, encoding);
  return `${mainUrl}/dbfiles/${some.options._id}`;
};

const FILE_EXT_RE = /(\.[_\-a-zA-Z0-9]{0,16})[\S\s]*/;
export const uploadFileFS = async (file) => {
  const { createReadStream, filename, mimetype, encoding, capacitor } =
    await file;
  const stream = createReadStream();
  const imageId = uid.sync(18);
  const imageName = imageId + path.extname(filename).replace(FILE_EXT_RE, "$1");
  console.log(imageName, path.extname(filename));

  // путь к файлу на сервере с актуальным именем
  const toPath = path.join(
    __dirname,
    "public",
    "img",
    "upload",
    `${imageName}`
  );
  // работа с потоком чтения
  await new Promise((res, rej) => {
    stream
      .on("error", (error) => {
        logger("ERROR", {
          name: "uploadFileFS",
          error
        });
        console.log(error);
        rej(error);
      })
      .pipe(
        createWriteStream(toPath).on("pipe", (readable) => {
          readable.on("readable", () => {
            let chunk;
            while (null !== (chunk = readable.read())) {
              console.log(`Read ${chunk.length} bytes of data...`);
            }
          });
        })
      )
      .on("finish", res);
  });
  // по завершении выводит в консоль мета-данные
  console.log("---------------file written!", imageName, mimetype, encoding);
  return `/img/upload/${imageName}`;
};
