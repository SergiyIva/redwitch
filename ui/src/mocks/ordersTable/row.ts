import { RowType } from "../../Admin/Pages/Orders/Orders";
import { fakeOrder } from "./orders";
import { Order } from "../../GraphQL/typeDefs";
import { range } from "lodash";

export const getRow = (order?: Order): RowType => {
  order = order || fakeOrder();
  return {
    ...order,
    serviceId: order.service.sku,
    serviceName: order.service.name,
    price: order.service.price
  };
};

export const getRows = (num: number) => range(num).map(() => getRow());
