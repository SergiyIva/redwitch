import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Item, ItemProps } from "./Item";
import { fakeFeature } from "../../../../../../mocks/features/features";

it("Item render correct", () => {
  const data: ItemProps = {
    item: fakeFeature("date"),
    i: 0,
    animated: true
  };
  const screen = render(
    <Item item={data.item} i={data.i} animated={data.animated} />
  );
  expect(
    screen.getByRole("heading", { name: data.item.title })
  ).toBeInTheDocument();
  expect(screen.getByTestId("date")).toBeInTheDocument();
});
