import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

it("Spinner, display component render", () => {
  const { getByText } = render(<Spinner />);
  expect(getByText(/loading/i)).toBeInTheDocument();
});

it("Spinner, rendering with fullScreen property", () => {
  const screen = render(<Spinner isFullScreen={true} />);
  expect(screen.getByRole("status", { name: "spinner" })).toHaveStyle({
    height: "70vh"
  });
});
