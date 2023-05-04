import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

it("App correct render without crashing", () => {
  const screen = render(<App />);
  expect(
    screen.getByRole("heading", { name: /добро пожаловать/i })
  ).toBeInTheDocument();
  const id = window.localStorage.getItem("clientId");
  expect(id).toBeTruthy();
});
