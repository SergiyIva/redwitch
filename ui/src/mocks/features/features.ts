import { Feature } from "../../GraphQL/typeDefs";
import { faker } from "@faker-js/faker";

const makeFakeFeature = (icon: string): Feature => ({
  id: faker.database.mongodbObjectId(),
  title: faker.commerce.productName(),
  description: faker.lorem.words(),
  icon
});

export const fakeFeature = (icon: string) => makeFakeFeature(icon);
export const fakeFeatures = (icons: string[]) =>
  icons.map((icon) => makeFakeFeature(icon));
