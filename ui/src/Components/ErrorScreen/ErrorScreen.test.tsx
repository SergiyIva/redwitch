import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// @ts-ignore
import faker from "faker";
import { ErrorScreen } from "./ErrorScreen";

const fakeErrorMsg = faker.lorem.words();

it("ErrorScreen rendering with random error message", () => {
  const error = new Error(fakeErrorMsg);
  render(<ErrorScreen error={error} />);
  expect(screen.getByText(new RegExp(fakeErrorMsg, "i"))).toBeInTheDocument();
});
