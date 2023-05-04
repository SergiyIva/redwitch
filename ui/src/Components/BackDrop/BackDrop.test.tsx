import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BackDrop } from "./BackDrop";
import user from "@testing-library/user-event";
import { isBackDropVar } from "../../GraphQL/Cache";
import { act } from "react-dom/test-utils";

it("BackDrop, display backdrop background", async () => {
  const screen = render(<BackDrop />);
  act(() => {
    isBackDropVar(true);
  });
  const background = screen.getByTestId("backdrop");
  expect(background).toBeInTheDocument();
  expect(background).not.toHaveClass("show");
  await act(() => new Promise((res) => setTimeout(res, 150)));
  expect(background).toHaveClass("show");
  user.click(background);
  expect(background).not.toHaveClass("show");
  await act(() => new Promise((res) => setTimeout(res, 150)));
  expect(background).not.toBeInTheDocument();
});
