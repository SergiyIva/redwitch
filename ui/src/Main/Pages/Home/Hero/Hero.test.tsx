import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { Hero } from "./Hero";
import { slideContactVar } from "../../../../GraphQL/Cache";

describe("Hero component", () => {
  it("Hero displays the heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /добро пожаловать/i })
    ).toBeInTheDocument();
  });

  it("Hero 'Связаться с нами' btn click to change slideContactVar", () => {
    render(<Hero />);
    const btn = screen.getByRole("button", { name: /связаться с нами/i });
    const prevValue = slideContactVar();
    fireEvent.click(btn);
    const nextValue = slideContactVar();
    expect(nextValue - prevValue).toBe(1);
  });
});
