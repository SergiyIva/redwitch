import { uploadFileFS } from "../utils.js";
import logger from "../../lib/importantLog.js";
import Errors from "apollo-server-express";
import { handleError } from "../mutation.js";

const cardValidation = ({ describe, price, name, slug, position, tags }) => {
  if (describe.length < 10 || describe.length > 1000) {
    throw new Error(
      "Введенные Вами данные некорректны. Описание должно быть длиннее 10 и короче 1000 символов."
    );
  }
  if (/\D/.test(price)) {
    throw new Error(
      "Введенные Вами данные некорректны. Цена должна быть числом."
    );
  }
  if (!/\w/.test(name) && !/\p{Script=Cyrillic}/u.test(name)) {
    throw new Error(
      "Введенные Вами данные некорректны. Имя должно содержать буквы!"
    );
  }
  if (
    String(price).length > 10 ||
    name.length > 32 ||
    slug.length > 32 ||
    String(position).length > 32 ||
    (position && /\D/.test(position)) ||
    tags.join("").length > 100
  ) {
    throw new Error("Введенные Вами данные некорректны.");
  }
};

export const upsertCard = async (parent, args, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError("Ошибка, вы не авторизованы!");
  }
  const { file, ...argsToOptns } = args;
  if (file) {
    argsToOptns.srcImg = await uploadFileFS(file);
  }
  const getSku = async () => {
    const count = await models.Cardservice.find().countDocuments();
    const num = (count + 1).toString();
    if (num.length === 1) {
      return `00${num}`;
    } else if (num.length === 2) {
      return `0${num}`;
    } else return num.toString();
  };
  logger("POST", {
    name: "upsertCard",
    obj: argsToOptns
  });
  cardValidation({
    describe: argsToOptns.describe,
    price: argsToOptns.price,
    position: argsToOptns.position,
    name: argsToOptns.name,
    tags: argsToOptns.tags,
    slug: argsToOptns.slug
  });
  try {
    return await models.Cardservice.findOneAndUpdate(
      {
        name: args.name
      },
      {
        $set: {
          ...argsToOptns
        },
        $setOnInsert: {
          sku: "SE" + (await getSku())
        }
      },
      {
        new: true,
        upsert: true
      }
    );
  } catch (e) {
    const msg = `Ошибка при получении/изменении услуги ${argsToOptns.title} `;
    handleError(e, msg, upsertCard.name);
    throw e;
  }
};

export const deleteCard = async (parent, { idx }, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError("Ошибка, вы не авторизованы!");
  }
  if (me.access.level > 3) {
    throw new Errors.ForbiddenError("Ошибка, недостаточно прав!");
  }
  try {
    await models.Cardservice.deleteOne({ sku: idx });
    return true;
  } catch (e) {
    const msg = `Ошибка при удалении услуги ${idx} `;
    return handleError(e, msg, deleteCard.name);
  }
};
