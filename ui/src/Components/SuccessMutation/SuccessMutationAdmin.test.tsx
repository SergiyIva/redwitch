import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SuccessMutationAdmin } from "./SuccessMutationAdmin";

describe("SuccessMutationAdmin", () => {
  const repeat = jest.fn();
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <SuccessMutationAdmin goBack={"/"} repeat={repeat} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /операция прошла успешно/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /нажмите сюда/i }).length
    ).toEqual(2);
    user.click(screen.getByTestId("repeat"));
    expect(repeat).toBeCalledTimes(1);
  });
});
