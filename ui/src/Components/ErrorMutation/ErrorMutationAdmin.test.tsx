import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ErrorMutationAdmin } from "./ErrorMutationAdmin";
import { TestError } from "../../mocks/responses/responses";
import { BrowserRouter } from "react-router-dom";

describe("ErrorMutationAdmin", () => {
  const tryAgain = jest.fn();
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <ErrorMutationAdmin error={new TestError()} tryAgain={tryAgain} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /Произошла ошибка/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /операцию/i }));
    expect(tryAgain).toBeCalledTimes(1);
  });
});
