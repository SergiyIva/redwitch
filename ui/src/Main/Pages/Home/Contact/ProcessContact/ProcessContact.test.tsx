import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../Styles/theme";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import ProcessContact from "./ProcessContact";
import {
  ADD_CALL_ORDER,
  AddCallorderType
} from "../../../../../GraphQL/Mutation";
import { TestError } from "../../../../../mocks/responses/responses";

describe("ProcessContact", () => {
  const formValues = {
    name: "test",
    phone: "9995552244",
    email: "",
    checkbox: "false",
    message: ""
  };
  const mocks: MockedResponse<AddCallorderType["AddCallorder"]>[] = [
    {
      request: {
        query: ADD_CALL_ORDER,
        variables: {
          ...formValues,
          subscriber: formValues.checkbox === "true",
          describe: formValues.message
        }
      },
      result: {
        data: {
          addCallorder: true
        }
      }
    },
    {
      request: {
        query: ADD_CALL_ORDER,
        variables: {
          ...formValues,
          name: "empty",
          subscriber: formValues.checkbox === "true",
          describe: formValues.message
        }
      },
      result: {
        data: {
          addCallorder: false
        }
      }
    },
    {
      request: {
        query: ADD_CALL_ORDER,
        variables: {
          ...formValues,
          name: "error",
          subscriber: formValues.checkbox === "true",
          describe: formValues.message
        }
      },
      error: new TestError()
    }
  ];
  const BaseComponent = () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <MockedProvider mocks={mocks}>
          <ProcessContact />
        </MockedProvider>
      </ThemeProvider>
    );
  };
  it("renders correct, get correct data, given success state", async () => {
    render(<BaseComponent />);
    const stateDivider = screen.getByTestId("stateDivider");
    expect(stateDivider).not.toBeVisible();
    const heading = screen.getByRole("heading", { name: /связаться с нами/i });
    expect(heading).toBeVisible();
    user.type(screen.getByPlaceholderText(/имя/i), formValues.name);
    user.type(screen.getByPlaceholderText(/999-999-99-99/i), formValues.phone);
    user.click(screen.getByRole("button", { name: /далее/i }));
    user.click(screen.getByRole("button", { name: /отправить/i }));
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(stateDivider).toBeVisible();
    expect(heading).not.toBeVisible();
    expect(
      await screen.findByRole("heading", { name: /благодарим за обращение/i })
    ).toBeVisible();
  });
  it.each`
    name
    ${"empty"}
    ${"error"}
  `("given error data response", async ({ name }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent />);
    user.type(screen.getByPlaceholderText(/имя/i), name);
    user.type(screen.getByPlaceholderText(/999-999-99-99/i), formValues.phone);
    user.click(screen.getByRole("button", { name: /далее/i }));
    user.click(screen.getByRole("button", { name: /отправить/i }));
    expect(
      await screen.findByRole("heading", { name: /произошла ошибка/i })
    ).toBeVisible();
  });
});
