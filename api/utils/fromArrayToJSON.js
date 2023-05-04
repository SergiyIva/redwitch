import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainstream = fs.createWriteStream(__dirname + "/fromArray.json", {
  flags: "a"
});

// добавь сюда данные
const array = [
  {
    name: "Вконтакте",
    svg: "vk",
    href: "https://vk.com/finevideo"
  },
  {
    name: "Одноклассники",
    svg: "odnoklassniki",
    href: "https://www.odnoklassniki.com/finevideo"
  },
  {
    name: "Twitter",
    svg: "twitter",
    href: "https://www.twitter.com/finevideo"
  },
  {
    name: "YouTube",
    svg: "youtube",
    href: "https://www.youtube.com/user/finevideo"
  },
  {
    name: "Instagram",
    svg: "instagram",
    href: "https://www.instagram.com/finevideo"
  }
];

// запуск > node fromArrayToJSON.js

const tojson = array.map((f) => JSON.stringify(f));

tojson.forEach((d) => mainstream.write(d + "\n", "utf-8"));
