import { Cardservice } from "../../GraphQL/typeDefs";
import { faker } from "@faker-js/faker";
import { range } from "lodash";

faker.locale = "ru";

const makeFakeCard = (sku?: string): Cardservice => ({
  id: faker.database.mongodbObjectId(),
  position: faker.datatype.number(),
  available: faker.datatype.boolean(),
  sku: sku || "SKU" + faker.random.numeric(3, { allowLeadingZeros: true }),
  name: faker.random.words(2),
  price: faker.datatype.number(),
  describe: faker.commerce.productDescription(),
  tags: faker.lorem.words(5).split(" "),
  slug: faker.lorem.words(2).substring(0, 30),
  srcImg: "/" + faker.random.word(),
  createdAt: faker.date.past().toString(),
  updatedAt: faker.date.past().toString(),
  orderCount: faker.datatype.number()
});

export const fakeCard = (sku?: string) => makeFakeCard(sku);

export const fakeCards = (num: number) => range(num).map(() => makeFakeCard());
