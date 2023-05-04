import Errors from "apollo-server-errors";
import _ from "lodash";

const writeLog = async (clientId, models, page) => {
  if (!clientId) return;
  await models.Analytic.create({
    page,
    visitedAt: new Date(),
    clientId
  });
};

const query = {
  user: async (parent, { username }, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    const fromName = await models.User.findOne({ username });
    if (fromName) return fromName;
    return models.User.findById(username);
  },
  me: async (parent, args, { models, user }) => {
    if (!user) {
      throw new Errors.AuthenticationError("Error signing in");
    }
    return models.User.findById(user.id);
  },
  getCards: async (parent, { idx, isAll }, { models, clientid }) => {
    if (idx) {
      const cardData = await models.Cardservice.findOne({
        sku: idx.toUpperCase()
      });
      return [cardData];
    } else if (isAll) {
      return models.Cardservice.find().sort({
        position: -1
      });
    } else {
      writeLog(clientid, models, "/");
      return models.Cardservice.find({ available: true }).sort({
        position: -1
      });
    }
  },
  getFeatures: async (parent, args, { models, clientid }) => {
    //writeLog(clientid, models, "/about");
    return models.Feature.find();
  },
  getRandomCite: async (parent, args, { models }) => {
    const random = Math.random();
    let result = await models.Cite.findOne({ random: { $gt: random } });
    if (!result) {
      result = await models.Cite.findOne({ random: { $lte: random } });
    }
    return result;
  },

  getCallorders: async (parent, args, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    return await models.Callorder.find({}).sort({ _id: -1 }).limit(15);
  },
  getOrdersFeed: async (
    parent,
    { cursor, sorting, filter },
    { models, user }
  ) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    const limit = filter.onPage === -1 ? null : filter.onPage;
    let skip = 0;
    const textSearch =
      filter && filter.textSearch
        ? { $text: { $search: filter.textSearch } }
        : {};

    if (cursor) {
      skip = Number(cursor);
    }
    const getSort = () => {
      if (!sorting) return { _id: 1 };
      const sortDirection = sorting.sort === "ASCENDING" ? 1 : -1;
      if (sorting.sortBy === "serviceId") {
        return {
          "serviceDetails.sku": sortDirection,
          _id: -1
        };
      } else if (sorting.sortBy === "serviceName") {
        return {
          "serviceDetails.name": sortDirection,
          _id: -1
        };
      } else if (
        sorting.sortBy !== "orderNumber" &&
        sorting.sortBy !== "createdAt"
      ) {
        return {
          [sorting.sortBy]: sortDirection,
          _id: -1
        };
      } else {
        return {
          _id: sortDirection
        };
      }
    };
    const sortQuery = getSort();
    let orders;
    if (sorting.sortBy === "serviceId" || sorting.sortBy === "serviceName") {
      orders = await models.Order.aggregate([
        { $match: textSearch },
        {
          $lookup: {
            from: "cardservices",
            localField: "service",
            foreignField: "_id",
            as: "serviceDetails"
          }
        },
        { $unwind: "$serviceDetails" },
        { $sort: sortQuery }
      ])
        .skip(skip * limit)
        .limit(limit ? limit : Infinity)
        .project({ serviceDetails: 0 });
    } else {
      orders = await models.Order.find(textSearch)
        .sort(sortQuery)
        .limit(limit)
        .skip(skip * limit);
    }
    const ordersCount = await models.Order.countDocuments(textSearch);
    return {
      orders,
      totalOrders: Number(ordersCount)
    };
  },
  getSubscribers: async (parent, args, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    return models.Callorder.aggregate([
      { $match: { subscriber: true } },
      { $project: { email: 1, name: 1, _id: 0 } },
      { $group: { _id: { email: "$email" }, name: { $addToSet: "$name" } } }
    ]);
  },
  getVisits: async (parent, { from, to }, { models, user }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    // список id клиентов админа
    const userIds = await models.User.findOne().clientId;
    const stat = await models.Analytic.aggregate([
      {
        $match: {
          visitedAt: {
            $gte: new Date(from.year, from.month, 1),
            $lt: new Date(to.year, to.month, 1)
          }
          // clientId: { $nin: userIds }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfYear: { $dayOfYear: "$visitedAt" },
          year: { $year: "$visitedAt" },
          clientId: 1
        }
      },
      {
        $group: {
          _id: { year: "$year", dayOfYear: "$dayOfYear" },
          clients: { $addToSet: "$clientId" },
          hits: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          dayOfYear: "$_id.dayOfYear",
          year: "$_id.year",
          hits: 1,
          clients: { $size: "$clients" }
        }
      }
    ]);
    const totalHits = _(stat).map(_.property("hits")).sum();
    const totalClients = _(stat).map(_.property("clients")).sum();
    return {
      stat,
      totalHits,
      totalClients
    };
  },
  getOrdersStat: async (parent, { from, to }, { user, models }) => {
    const me = await models.User.findById(user.id);
    if (!me) {
      throw new Errors.AuthenticationError(
        "Error, you must be signed in to get this data!"
      );
    }
    const statOrders = await models.Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(from.year, from.month, 1),
            $lt: new Date(to.year, to.month, 1)
          }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfYear: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { year: "$year", dayOfYear: "$dayOfYear" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          dayOfYear: "$_id.dayOfYear",
          year: "$_id.year",
          orders: 1
        }
      }
    ]);
    const totalOrders = _(statOrders).map(_.property("orders")).sum();
    const statCalls = await models.Callorder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(from.year, from.month, 1),
            $lt: new Date(to.year, to.month, 1)
          }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfYear: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { year: "$year", dayOfYear: "$dayOfYear" },
          calls: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          dayOfYear: "$_id.dayOfYear",
          year: "$_id.year",
          calls: 1
        }
      }
    ]);
    const totalCalls = _(statCalls).map(_.property("calls")).sum();
    const yearAndDay = (obj) => `${obj.year}/${obj.day}`;
    const stat = _.chain(statOrders)
      .concat(statCalls)
      .groupBy(yearAndDay)
      .values()
      .map((arr) => _.reduce(arr, _.merge, {}))
      .value();
    console.log(stat, totalOrders, totalCalls);
    return {
      stat,
      totalOrders,
      totalCalls
    };
  }
};

export default query;
