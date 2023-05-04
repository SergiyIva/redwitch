import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
//@ts-ignore
import faker from "faker";
import { Card } from "./Card";
import { fakeCard } from "../../../../../mocks/serviceCards/serviceCards";
import { orderSKUVar } from "../../../../../GraphQL/Cache";

const index = faker.datatype.number();

describe("Card visible and hidden test with fake data", () => {
  let card = fakeCard();
  beforeEach(() => (card = fakeCard()));
  it("Card render with fake data", () => {
    const screen = render(<Card index={index} card={card} animated={true} />);
    const img = screen.getByRole("img");
    const header = screen.getByRole("heading", { name: card.name });
    const describe = screen.getByText(card.describe);
    expect(img).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(describe).toBeInTheDocument();
  });

  it("Card render but data is hidden", () => {
    const card = fakeCard();
    const screen = render(<Card index={index} card={card} animated={false} />);
    const wrapper = screen.getByTestId("cardwrapper");
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toBeInTheDocument();
    expect(wrapper).not.toBeVisible();
  });

  it("Card btn click 'Оформить' btn", () => {
    const card = fakeCard();
    const screen = render(<Card index={index} card={card} animated={true} />);
    const btn = screen.getByRole("button", { name: /оформить/i });
    fireEvent.click(btn);
    const skuOrder = orderSKUVar();
    expect(skuOrder).toBe(card.sku);
  });
});
