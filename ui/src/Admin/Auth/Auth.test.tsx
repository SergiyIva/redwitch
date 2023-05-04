import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { act, render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Auth from "./Auth";
import { BrowserRouter } from "react-router-dom";
import { SIGNIN_USER, SignInType } from "../../GraphQL/Mutation";
import { GraphQLError } from "graphql/error/GraphQLError";
import { faker } from "@faker-js/faker";

describe("Auth component", () => {
  const fakeData = {
    username: faker.internet.userName(),
    password: faker.internet.password(8)
  };
  const errorData = {
    username: faker.internet.userName(),
    password: faker.internet.password(8)
  };
  const token = faker.datatype.uuid();
  const mocks: MockedResponse<SignInType["SignIn"]>[] = [
    {
      request: {
        query: SIGNIN_USER,
        variables: fakeData
      },
      result: {
        data: {
          signIn: token
        }
      }
    },
    {
      request: {
        query: SIGNIN_USER,
        variables: errorData
      },
      result: {
        errors: [new GraphQLError("Test GQL Error.")]
      }
    }
  ];
  const BaseComponent = () => (
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    </MockedProvider>
  );
  it("Render correct", () => {
    const screen = render(<BaseComponent />);
    expect(screen.queryByText(/Неверный логин/i)).not.toBeInTheDocument();
    expect(screen.getByText(/NailNet/i)).toBeInTheDocument();
  });
  it("given success state, save token in localStorage", async () => {
    const screen = render(<BaseComponent />);
    const username = screen.getByLabelText(/имя пользователя/i);
    const password = screen.getByLabelText(/пароль/i);
    const rememberMe = screen.getByRole("checkbox");
    const loginBtn = screen.getByRole("button", {
      name: /войти/i
    });

    user.type(username, fakeData.username);
    user.type(password, fakeData.password);
    user.click(rememberMe);

    expect(screen.getByTestId("form")).toHaveFormValues({
      username: fakeData.username,
      password: fakeData.password,
      checkbox: true
    });

    user.click(loginBtn);
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(window.localStorage.getItem("token")).toBe(token);
    expect(window.location.pathname).toBe("/admin/main");
  });
  it("Send response and get request successfully, save token in sessionStorage", async () => {
    const screen = render(<BaseComponent />);
    const username = screen.getByLabelText(/имя пользователя/i);
    const password = screen.getByLabelText(/пароль/i);
    const loginBtn = screen.getByRole("button", {
      name: /войти/i
    });

    user.type(username, fakeData.username);
    user.type(password, fakeData.password);

    expect(screen.getByTestId("form")).toHaveFormValues({
      username: fakeData.username,
      password: fakeData.password,
      checkbox: false
    });
    user.click(loginBtn);
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(window.sessionStorage.getItem("token")).toBe(token);
    expect(window.location.pathname).toBe("/admin/main");
  });
  it("Send response, show loading spinner and get request with error", async () => {
    const screen = render(<BaseComponent />);
    const username = screen.getByLabelText(/имя пользователя/i);
    const password = screen.getByLabelText(/пароль/i);
    const loginBtn = screen.getByRole("button", {
      name: /войти/i
    });

    user.type(username, errorData.username);
    user.type(password, errorData.password);

    expect(screen.getByTestId("form")).toHaveFormValues({
      username: errorData.username,
      password: errorData.password,
      checkbox: false
    });
    user.click(loginBtn);
    expect(screen.getByTestId("spinnerWrapper")).toBeInTheDocument();
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText(/Неверный логин/i)).toBeInTheDocument();
  });
});
