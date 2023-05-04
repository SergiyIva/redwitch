import user from "@testing-library/user-event";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Form } from "./Form";
import { SignInType } from "../../../GraphQL/Mutation";
import { FetchResult } from "@apollo/client";

describe("Auth/Form", () => {
  it("Form correct render", () => {
    const mockAction = jest.fn(
      () => new Promise<FetchResult<SignInType["SignIn"]>>(() => ({}))
    );
    const screen = render(<Form action={mockAction} />);
    const username = screen.getByLabelText(/имя пользователя/i);
    const loginBtn = screen.getByRole("button", {
      name: /войти/i
    });
    expect(username).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it("Form had given credentials, returns enabled submit button, click button and submit action fn", async () => {
    const mockAction = jest.fn(
      () => new Promise<FetchResult<SignInType["SignIn"]>>((res) => ({}))
    );
    const screen = render(<Form action={mockAction} />);
    const username = screen.getByLabelText(/имя пользователя/i);
    const password = screen.getByLabelText(/пароль/i);
    const rememberMe = screen.getByRole("checkbox");
    const loginBtn = screen.getByRole("button", {
      name: /войти/i
    });
    expect(loginBtn).toBeDisabled();
    user.click(loginBtn);
    expect(mockAction).not.toHaveBeenCalled();
    const fakeData = {
      username: "testUser",
      password: "123password"
    };
    user.type(username, fakeData.username);
    user.type(password, fakeData.password);
    user.click(rememberMe);
    expect(loginBtn).not.toBeDisabled();
    expect(screen.getByTestId("form")).toHaveFormValues({
      username: fakeData.username,
      password: fakeData.password,
      checkbox: true
    });
    user.click(loginBtn);
    expect(mockAction).toHaveBeenCalledTimes(1);

    user.click(rememberMe);
    expect(rememberMe).not.toBeChecked();
    user.click(loginBtn);
    expect(mockAction).toHaveBeenCalledTimes(2);
  });
});
