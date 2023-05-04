import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders correct", async () => {
    render(
      <Tooltip title={"Tooltip head"} tooltip={"tooltip body"} widthInRem={10}>
        <h1>Heading</h1>
      </Tooltip>
    );
    const elt = screen.getByRole("heading", { name: /heading/i });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    user.hover(elt);
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveStyle({ minWidth: "10rem" });
    expect(
      screen.getByRole("heading", { name: /tooltip head/i })
    ).toBeVisible();
    user.unhover(elt);
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(tooltip).not.toBeInTheDocument();
  });
});
