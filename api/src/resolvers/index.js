import Query from "./query.js";
import Mutation from "./mutation.js";
import User from "./user.js";
import Order from "./order.js";

import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import GraphQLDate from "graphql-iso-date";

const resolvers = {
  Query,
  Mutation,
  User,
  Order,
  DateTime: GraphQLDate.GraphQLDateTime,
  Upload: GraphQLUpload
};

export default resolvers;
