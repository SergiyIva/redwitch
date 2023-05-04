import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { Form } from "./Form";
import { lightTheme } from "../../../../../../Styles/theme";
import { slideContactVar } from "../../../../../../GraphQL/Cache";

describe("Form", () => {
  const action = jest.fn().mockImplementation(() => {});
  const BaseComponent = () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <Form action={action} />
      </ThemeProvider>
    );
  };

  it("renders correct", async () => {
    render(<BaseComponent />);
    const name = screen.getByPlaceholderText(/имя/i);
    expect(name).not.toHaveFocus();
    expect(screen.getByRole("form")).toBeInTheDocument();
    act(() => {
      slideContactVar(2);
    });
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(name).toHaveFocus();
  });
  it("get values, call action", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent />);
    const name = screen.getByPlaceholderText(/имя/i);
    const phone = screen.getByPlaceholderText(/999-999-99-99/i);
    const email = screen.getByPlaceholderText(/email \(не обязательно\)/i);
    const checkbox = screen.getByRole("checkbox", { hidden: true });
    const textarea = screen.getByRole("textbox", { name: /сообщение/i });
    const backBtn = screen.getByTestId("buttonBack");
    const forwardBtn = screen.getByRole("button", { name: /далее/i });
    expect(name).toBeVisible();
    expect(backBtn).not.toBeVisible();
    expect(forwardBtn).toHaveClass("disabled");

    user.type(name, " ");
    user.type(phone, "123");
    user.type(email, "123");
    user.click(forwardBtn);
    expect(name).toBeVisible();
    expect(name).toHaveClass("is-invalid");
    expect(phone).toHaveClass("is-invalid");
    expect(email).toHaveClass("is-invalid");
    user.clear(name);
    user.clear(phone);
    user.clear(email);

    user.type(name, "Name");
    expect(forwardBtn).toHaveClass("disabled");
    user.type(phone, "1234567890");
    expect(forwardBtn).not.toHaveClass("disabled");
    expect(checkbox).not.toBeVisible();
    user.type(email, "test@mail.ru");
    expect(checkbox).toBeVisible();
    user.click(checkbox);
    user.click(forwardBtn);
    expect(backBtn).toBeVisible();
    user.click(backBtn);
    expect(backBtn).not.toBeVisible();
    user.click(forwardBtn);
    expect(backBtn).toBeVisible();
    expect(forwardBtn).toHaveTextContent(/отправить/i);
    user.type(textarea, "12345678901");
    expect(name).toHaveClass("is-valid");
    expect(phone).toHaveClass("is-valid");
    expect(email).toHaveClass("is-valid");
    expect(action).not.toBeCalled();
    act(() => {
      user.click(forwardBtn);
    });
    expect(action).toBeCalledTimes(1);
  });
});
