import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
import { useLockBodyScroll } from "./useLockBodyScroll";

describe("useLockBodyScroll", () => {
  const BaseComponent = () => {
    useLockBodyScroll();
    return <div />;
  };
  it("correct functionality", () => {
    const originalStyle = document.body.style.overflow;
    const container = render(<BaseComponent />);
    expect(document.body.style.overflow).toBe("hidden");
    act(() => container.unmount());
    expect(document.body.style.overflow).toBe(originalStyle);
  });
});
