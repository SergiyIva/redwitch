import logger from "../../lib/importantLog.js";
import mongoose from "mongoose";
import { handleError } from "../mutation.js";
import Errors from "apollo-server-express";

export const addOrder = async (
  parent,
  { sku, name, email, subscriber, phone, description, promocode },
  { models, clientid }
) => {
  logger("POST", {
    name: "addOrder",
    obj: { sku, name, phone, email, subscriber, description, promocode }
  });
  const currentSession = await models.Session.find({
    clientId: clientid
  })
    .limit(1)
    .sort({ _id: -1 });
  validateCallorder({ name, phone, email, description, sku });
  const service = await models.Cardservice.findOne({ sku });
  if (!service) {
    throw new Error("Данной услуги не существует!");
  }
  try {
    const emailMod = email.toLowerCase().trim();
    console.log(`Получена заявка от ${name} <${phone}>`);
    if (currentSession.length && currentSession[0].orderedCount > 10)
      throw new Error("Превышен лимит запросов.");
    else await currentSession[0].updateOne({ $inc: { orderedCount: 1 } });
    const getNumber = async () => {
      const count = await models.Order.findOne()
        .sort({ orderNumber: -1 })
        .limit(1);
      return Number(count.orderNumber) + 1;
    };
    await models.Order.create({
      orderNumber: await getNumber().then(String),
      service: mongoose.Types.ObjectId(service._id),
      name,
      phone,
      email: emailMod,
      subscriber,
      description,
      clientId: clientid
    });
    return true;
  } catch (err) {
    const msg = `Ошибка при получении заявки от ${name} <${phone}>`;
    return handleError(err, msg, mutation.addOrder.name);
  }
};
export const updateOrder = async (parent, args, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError("Ошибка, вы не авторизованы!");
  }
  const order = await models.Order.findById(args.id);
  if (!order) {
    throw new Error("Данного заказа не существует");
  }
  const service = await models.Cardservice.findOne({ sku: args.sku });
  if (!service) {
    throw new Error("Данной услуги не существует!");
  }
  try {
    const email = args.email.toLowerCase().trim();
    return await models.Order.findByIdAndUpdate(
      args.id,
      {
        $set: {
          ...args,
          email,
          service: mongoose.Types.ObjectId(service._id)
        }
      },
      { new: true }
    );
  } catch (e) {
    const msg = `Ошибка при изменении заказа ${order.orderNumber}`;
    handleError(e, msg, updateOrder.name);
    throw e;
  }
};
export const changeOrderStatus = async (
  parent,
  { id, status },
  { models, user }
) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError("Ошибка, вы не авторизованы!");
  }
  const order = await models.Order.findById(id);
  if (!order) {
    throw new Error("Данного заказа не существует");
  }
  try {
    return await models.Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status
        }
      },
      { new: true }
    );
  } catch (e) {
    const msg = `Ошибка при изменении заказа ${order.orderNumber}`;
    handleError(e, msg, changeOrderStatus.name);
    throw e;
  }
};
export const deleteOrder = async (parent, { id }, { models, user }) => {
  const me = await models.User.findById(user.id);
  if (!me) {
    throw new Errors.ForbiddenError("Ошибка, вы не авторизованы!");
  }
  const order = await models.Order.findById(id);
  if (!order) {
    return true;
  }
  try {
    await order.deleteOne();
    return true;
  } catch (e) {
    const msg = `Ошибка при удалении заказа ${order.orderNumber}`;
    return handleError(e, msg, deleteOrder.name);
  }
};
export const addCallorder = async (
  parent,
  { name, phone, email, subscriber, describe },
  { models, clientid }
) => {
  logger("POST", {
    name: "addCallorder",
    obj: { name, phone, email, subscriber, describe }
  });
  const currentSession = await models.Session.find({
    clientId: clientid
  })
    .limit(1)
    .sort({ _id: -1 });

  validateCallorder({ name, phone, email, describe });
  try {
    const emailMod = email && email.toLowerCase().trim();
    console.log(`Получен контакт от ${name} <${phone}>`);
    if (currentSession.length && currentSession[0].orderedCount > 10)
      throw new Error("Превышен лимит запросов.");
    else await currentSession[0].updateOne({ $inc: { orderedCount: 1 } });
    await models.Callorder.create({
      name,
      phone,
      email: emailMod,
      subscriber,
      describe
    });
    return true;
  } catch (err) {
    const msg = `Ошибка при получении контакта от ${name} <${phone}>`;
    return handleError(err, msg, addCallorder.name);
  }
};

const validateCallorder = ({ name, phone, email, describe, sku }) => {
  if (
    phone.length !== 10 ||
    /\D/.test(phone) ||
    name.length > 32 ||
    (!/\w/.test(name) && !/\p{Script=Cyrillic}/u.test(name)) ||
    (email && email.length > 201) ||
    (email && email.length < 6) ||
    (describe && describe.length > 1000) ||
    (sku && sku.length > 6)
  )
    throw new Error("Недействительные данные заявки!");
};
