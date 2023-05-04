import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Copyright } from "./Copyright";

it("Copyright is render correct", () => {
  const screen = render(<Copyright />);
  expect(screen.getByText(/nailnet/i)).toBeInTheDocument();
});
