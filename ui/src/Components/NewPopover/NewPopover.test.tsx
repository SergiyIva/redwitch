import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { NewPopover } from "./NewPopover";

describe("NewPopover", () => {
  it("renders correct with click-action state", async () => {
    render(
      <NewPopover
        body={{ message: "Popover Body" }}
        header={"Header of Popover"}
      >
        <h1>Elt for click</h1>
      </NewPopover>
    );
    const elt = screen.getByRole("heading", { name: /elt for click/i });
    expect(screen.queryByTestId("popover")).not.toBeInTheDocument();
    user.click(elt);
    const popover = screen.getByTestId("popover");
    expect(popover).toBeInTheDocument();
    expect(popover).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 150)));
    expect(popover).toBeVisible();
    user.unhover(elt);
    expect(popover).toBeVisible();
    user.click(elt);
    expect(popover).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 150)));
    expect(popover).not.toBeInTheDocument();
    user.hover(elt);
    expect(popover).not.toBeInTheDocument();
  });
  it("mouse enter/leave with hover-action state", async () => {
    render(
      <NewPopover
        body={{ message: "Popover Body" }}
        header={"Header of Popover"}
        actionType={"hover"}
        direction={"bottom"}
      >
        <h1>Elt for click</h1>
      </NewPopover>
    );
    const elt = screen.getByRole("heading", { name: /elt for click/i });
    expect(screen.queryByTestId("popover")).not.toBeInTheDocument();
    user.click(elt);
    expect(screen.queryByTestId("popover")).not.toBeInTheDocument();
    user.hover(elt);
    const popover = await screen.findByTestId("popover");
    expect(popover).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 150)));
    expect(popover).toBeVisible();
    user.hover(popover);
    await act(() => new Promise((res) => setTimeout(res, 500)));
    expect(popover).toBeVisible();
    user.unhover(popover);
    expect(popover).toBeInTheDocument();
    expect(popover).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 150)));
    expect(popover).not.toBeInTheDocument();
  });
  it("correct renders with disabled state", async () => {
    render(
      <NewPopover
        body={{ message: "Popover Body" }}
        header={"Header of Popover"}
        disabled={true}
        direction={"right"}
      >
        <h1>Elt for click</h1>
      </NewPopover>
    );
    const elt = screen.getByRole("heading", { name: /elt for click/i });
    user.click(elt);
    user.hover(elt);
    await act(() => new Promise((res) => setTimeout(res, 500)));
    expect(screen.queryByTestId("popover")).not.toBeInTheDocument();
  });
});
