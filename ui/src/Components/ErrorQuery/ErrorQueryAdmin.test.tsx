import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ErrorQueryAdmin } from "./ErrorQueryAdmin";
import { TestError } from "../../mocks/responses/responses";

describe("ErrorQueryAdmin", () => {
  const tryAgain = jest.fn();
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <ErrorQueryAdmin error={new TestError()} tryAgain={tryAgain} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /произошла ошибка/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /запрос/i }));
    expect(tryAgain).toBeCalledTimes(1);
  });
});
