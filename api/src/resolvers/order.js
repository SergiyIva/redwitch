const order = {
  service: async (order, args, { models }) => {
    return await models.Cardservice.findById(order.service);
  }
};

export default order;
