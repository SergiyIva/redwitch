import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { Callorder } from "../../GraphQL/typeDefs";

const makeMockCallorder = (): Callorder => ({
  id: faker.database.mongodbObjectId(),
  createdAt: faker.date.past().toString(),
  describe: faker.lorem.words(7),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  phone: faker.phone.number("##########"),
  subscriber: faker.datatype.boolean()
});

export const fakeCallorder = () => makeMockCallorder();
export const fakeCallorders = (num: number) =>
  range(num).map((_) => makeMockCallorder());
