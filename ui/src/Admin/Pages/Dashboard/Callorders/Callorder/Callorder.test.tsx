import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fakeCallorder } from "../../../../../mocks/callorders/callorders";
import { Callorder, getDate, getDescribe, getPhone } from "./Callorder";
import { faker } from "@faker-js/faker";

describe("Callorder component", () => {
  it("should renders without crashing", () => {
    const order = fakeCallorder();
    const screen = render(
      <table>
        <tbody>
          <Callorder order={order} />
        </tbody>
      </table>
    );
    expect(screen.getByRole("cell", { name: order.name })).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new Date(order.createdAt).toLocaleDateString()
      })
    ).toBeInTheDocument();
  });
  it("getPhone function should return correct phone number", () => {
    const phone = "9993332552";
    const res = "8(999)333-25-52";
    expect(getPhone(phone)).toBe(res);
  });
  it("getDate function should return correct local date", () => {
    const date = "2021-12-03T05:40:44.408Z";
    const res = "03.12.2021";
    expect(getDate(date)).toBe(res);
  });
  it("getDescribe function should return max 15 chars length text", () => {
    const description = faker.commerce.productDescription();
    const res = getDescribe(description);
    expect(res!.length <= 15).toBeTruthy();
    const emptyRes = getDescribe(null);
    expect(emptyRes).toBeUndefined();
  });
});
