import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { BrowserRouter } from "react-router-dom";

describe("Sidebar", () => {
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("link", { name: /панель управления/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBe(11);
  });
});
