import useWindowWidth from "./useWindowWidth";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const customGlobal: any = global;

describe("useWindowWidth hook", () => {
  customGlobal.innerWidth = 500;
  const Comp = () => {
    const width = useWindowWidth();
    return <div>{width}</div>;
  };
  it("reads initial width value from window", () => {
    const screen = render(<Comp />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("update innerWidth value from window", () => {
    const screen = render(<Comp />);
    act(() => {
      customGlobal.innerWidth = 1000;
      fireEvent(customGlobal, new Event("resize"));
    });
    expect(screen.getByText("1000")).toBeInTheDocument();
  });
});
