import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { Order, StatusVars } from "../../GraphQL/typeDefs";
import { randArrayElt } from "../../functions/randArrayElt";
import { fakeCard } from "../serviceCards/serviceCards";

type Statuses = StatusVars[];
const statuses: Statuses = [
  StatusVars.accepted,
  StatusVars.confirmed,
  StatusVars.inWork,
  StatusVars.done,
  StatusVars.cancel
];

const makeFakeOrder = (): Order => ({
  _id: faker.database.mongodbObjectId(),
  orderNumber: faker.random.numeric(7),
  service: fakeCard(),
  name: faker.lorem.word(),
  phone: faker.phone.number("##########"),
  email: faker.internet.email(),
  subscriber: faker.datatype.boolean(),
  createdAt: faker.date.past().toString(),
  updatedAt: faker.date.past().toString(),
  status: randArrayElt(statuses),
  description: faker.lorem.words()
});

export const fakeOrder = () => makeFakeOrder();
export const fakeOrders = (num: number) =>
  range(num).map(() => makeFakeOrder());
