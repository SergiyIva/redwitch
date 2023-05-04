import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Whoops404 } from "./Whoops404";
import { BrowserRouter } from "react-router-dom";

describe("Whoops404", () => {
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <Whoops404 />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /error/i })).toBeVisible();
  });
});
