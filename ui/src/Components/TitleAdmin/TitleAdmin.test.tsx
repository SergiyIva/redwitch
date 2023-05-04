import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { TitleAdmin } from "./TitleAdmin";

describe("TitleAdmin", () => {
  it("renders correct", () => {
    render(<TitleAdmin>Test tittle</TitleAdmin>);
    expect(
      screen.getByRole("heading", { name: /test tittle/i })
    ).toBeInTheDocument();
  });
});
