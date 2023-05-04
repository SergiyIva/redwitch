import Errors from "apollo-server-express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { uploadFile } from "./utils.js";
import {
  signUp,
  signIn,
  deleteUser,
  changeUserAvatar,
  changeUserInfo,
  changeUserLogin,
  changeUserPassword
} from "./mutations/userMutation.js";
import { upsertCard, deleteCard } from "./mutations/contentMutation.js";
import {
  addOrder,
  addCallorder,
  updateOrder,
  changeOrderStatus,
  deleteOrder
} from "./mutations/orderMutation.js";
import logger from "../lib/importantLog.js";

dotenv.config();

const mainUrl = process.env.HOST;

export const handleError = (err, msg, name) => {
  logger("ERROR", {
    name,
    err,
    optns: msg
  });
  console.error(msg, err.message);
  return false;
};

const mutation = {
  // user mute
  signIn,
  signUp,
  changeUserPassword,
  changeUserLogin,
  changeUserInfo,
  changeUserAvatar,
  deleteUser,

  // content mute
  upsertCard,
  deleteCard,

  // order mute
  addOrder,
  addCallorder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,

  // others
  sendMailTo: async (parent, { describe, mails }, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to send mail!"
      );
    }
    logger("POST", {
      name: "sendMailTo",
      obj: { describe, mails: mails ? mails : "Всем" }
    });
    try {
      const match = { subscriber: true };
      if (mails) match.email = { $in: mails };
      const subscribers = await models.Callorder.aggregate([
        { $match: match },
        { $project: { email: 1, name: 1, _id: 0 } },
        { $group: { _id: { email: "$email" }, name: { $addToSet: "$name" } } }
      ]);
      for (let sub of subscribers) {
        logger("MAIL", {
          name: "sendMailTo",
          obj: { to: sub._id.email }
        });
        console.log(
          `${sub.name} отправлено письмо на почтовый ящик ${sub._id.email}`
        );
      }
      return true;
    } catch (err) {
      const msg = `Ошибка при отправке писем.>`;
      return handleError(err, msg, mutation.sendMailTo.name);
    }
  },
  uploadImage: async (parent, { file }, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to upload any files!"
      );
    }
    return await uploadFile(file);
  }
};

export default mutation;
