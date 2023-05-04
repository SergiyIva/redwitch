import getUser from "./getUser.js";
import models from "../models/index.js";

export const setContext = async ({ req }) => {
  const { clientid } = req.headers;
  const token = req.headers.authorization;
  const user = await getUser(token);
  console.log(user, req.body.operationName);
  return { models, user, clientid };
};
