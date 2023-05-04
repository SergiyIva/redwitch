import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { CardsWrapper } from "./CardsWrapper";
import { fakeCards } from "../../../../mocks/serviceCards/serviceCards";

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

it("CardsWrapper should be rendering with 3 fake data items", () => {
  const cards = fakeCards(3);
  const screen = render(<CardsWrapper cards={cards} />);
  const imgs = screen.getAllByRole("img", { hidden: true });
  expect(screen.getAllByRole("heading", { hidden: true }).length).toBe(3);
  expect(imgs.length).toBe(3);
  let i = 0;
  for (let img of imgs) {
    expect(img.getAttribute("src")).toBe(
      process.env.REACT_APP_URI! + cards[i].srcImg
    );
    i++;
  }
});
