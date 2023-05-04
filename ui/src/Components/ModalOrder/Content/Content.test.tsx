import "@testing-library/jest-dom/extend-expect";
import { act, render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../Styles/theme";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Content } from "./Content";
import { GetServiceCardType } from "../../../GraphQL/Query";
import { serviceCardResp, TestError } from "../../../mocks/responses/responses";
import { ADD_ORDER, AddOrderType } from "../../../GraphQL/Mutation";
import { faker } from "@faker-js/faker";
import { orderSKUVar } from "../../../GraphQL/Cache";

type Alerts = {
  name: boolean;
  phone: boolean;
  email: boolean;
};

const expectAlerts = (alerts: Alerts) => {
  const alertsCount = Object.values(alerts).reduce((acc, v) => {
    if (v) acc++;
    return acc;
  }, 0);
  expect(screen.getByPlaceholderText(/имя/i)).toHaveClass(
    alerts.name ? "is-invalid" : "is-valid"
  );
  expect(screen.getByPlaceholderText(/999-999-99-99/i)).toHaveClass(
    alerts.phone ? "is-invalid" : "is-valid"
  );
  expect(screen.getByPlaceholderText(/email/i)).toHaveClass(
    alerts.email ? "is-invalid" : "is-valid"
  );
  expect(screen.queryAllByRole("alert").length).toBe(alertsCount);
};

describe("Content", () => {
  const formValues = {
    name: "Test Name",
    phone: "9995554422",
    email: faker.internet.email(),
    checkbox: "false",
    content: faker.lorem.words(5)
  };
  const mocks: MockedResponse<
    GetServiceCardType["GetServiceCard"] | AddOrderType["AddOrder"]
  >[] = [
    serviceCardResp,
    {
      request: {
        query: ADD_ORDER,
        variables: {
          ...formValues,
          subscriber: formValues.checkbox === "true",
          description: formValues.content,
          sku: "SKU001"
        }
      },
      result: {
        data: {
          addOrder: true
        }
      }
    },
    {
      request: {
        query: ADD_ORDER,
        variables: {
          ...formValues,
          subscriber: formValues.checkbox === "true",
          description: formValues.content,
          sku: "SKU001",
          name: "False"
        }
      },
      result: {
        data: {
          addOrder: false
        }
      }
    },
    {
      request: {
        query: ADD_ORDER,
        variables: {
          ...formValues,
          subscriber: formValues.checkbox === "true",
          description: formValues.content,
          sku: "SKU001",
          name: "Error"
        }
      },
      error: new TestError()
    }
  ];
  const BaseComponent = () => (
    <ThemeProvider theme={lightTheme}>
      <MockedProvider mocks={mocks}>
        <Content sku={"SKU001"} />
      </MockedProvider>
    </ThemeProvider>
  );
  it("renders correct", async () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("heading", { name: /оформление заявки/i })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("numCircle", { exact: false }).length).toBe(4);
    expect(screen.getByRole("header")).toBeInTheDocument();
    expect(screen.getByTestId("modalBody")).toHaveStyle({
      overflowY: "auto"
    });
    expect(await screen.findByTestId("SKU001title")).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByTestId("stateDiv")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /назад/i })).toHaveClass(
      "disabled"
    );
    expect(screen.getByRole("button", { name: /далее/i })).toBeInTheDocument();
  });
  it("close modal dialog button", () => {
    orderSKUVar("SKU001");
    render(<BaseComponent />);
    expect(orderSKUVar()).toBe("SKU001");
    user.click(screen.getByRole("button", { name: /close/i }));
    expect(orderSKUVar()).toBe("");
  });
  it("change stages, typing correct data, given success state", async () => {
    render(<BaseComponent />);
    const forwardBtn = screen.getByRole("button", { name: /далее/i });
    const backBtn = screen.getByRole("button", { name: /назад/i });
    user.click(forwardBtn);
    expect(backBtn).not.toHaveClass("disabled");
    expect(screen.getByPlaceholderText(/имя/i)).not.toHaveClass("is-invalid");
    user.click(backBtn);
    expect(backBtn).toHaveClass("disabled");
    user.click(forwardBtn);

    const form = screen.getByRole("form");
    const name = within(form).getByPlaceholderText(/имя/i);
    const phone = within(form).getByPlaceholderText(/999-999-99-99/i);
    const email = within(form).getByPlaceholderText(/email/i);

    expect(name).toHaveClass("is-invalid");
    expect(phone).not.toHaveClass("is-invalid");
    expect(email).not.toHaveClass("is-invalid");
    expect(phone).not.toHaveClass("is-valid");
    expect(email).not.toHaveClass("is-valid");
    user.type(name, formValues.name);
    user.type(phone, formValues.phone);
    user.type(email, formValues.email);
    user.click(name);
    expect(name).toHaveClass("is-valid");
    expect(phone).toHaveClass("is-valid");
    expect(email).toHaveClass("is-valid");
    expectAlerts({ name: false, phone: false, email: false });
    user.click(forwardBtn);

    const textArea = within(form).getByRole("textbox", {
      name: /описание работы/i
    });
    expect(textArea).not.toHaveClass("is-invalid");
    expect(textArea).not.toHaveClass("is-valid");
    user.type(textArea, formValues.content);
    user.click(forwardBtn);
    const stateDiv = screen.getByTestId("stateDiv");
    expect(stateDiv).not.toBeVisible();
    const confirmHeader = screen.getByText(/подтвердите введенную информацию/i);
    expect(confirmHeader).toBeInTheDocument();
    const modalBody = screen.getByTestId("modalBody");
    expect(modalBody).toHaveStyle({
      overflowY: "auto"
    });
    user.click(screen.getByRole("button", { name: /подтвердить/i }));
    expect(confirmHeader).not.toBeVisible();
    expect(stateDiv).toBeVisible();
    expect(modalBody).not.toHaveStyle({
      overflowY: "auto"
    });
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /благодарим за оформление/i })
    ).toBeInTheDocument();
    const okBtn = screen.getByRole("button", { name: /ок/i });
    expect(okBtn).toBeInTheDocument();
    orderSKUVar("SKU001");
    const orderSku = orderSKUVar();
    expect(orderSku).toBe("SKU001");
    user.click(okBtn);
    expect(orderSKUVar()).toBe("");
  });
  it.each`
    nameValue
    ${"False"}
    ${"Error"}
  `(
    "typing correct data but given error state from server",
    async ({ nameValue }) => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      render(<BaseComponent />);
      const forwardBtn = screen.getByRole("button", { name: /далее/i });
      user.click(forwardBtn);
      const form = screen.getByRole("form");
      const name = within(form).getByPlaceholderText(/имя/i);
      const phone = within(form).getByPlaceholderText(/999-999-99-99/i);
      const email = within(form).getByPlaceholderText(/email/i);

      expect(name).not.toHaveClass("is-invalid");
      user.type(name, nameValue);
      user.type(phone, formValues.phone);
      user.type(email, formValues.email);
      user.click(forwardBtn);

      const textArea = within(form).getByRole("textbox", {
        name: /описание работы/i
      });
      user.type(textArea, formValues.content);
      user.click(forwardBtn);
      user.click(screen.getByRole("button", { name: /подтвердить/i }));
      expect(await screen.findByText(/произошла ошибка/i)).toBeInTheDocument();
      expect(
        screen.getByText(/подтвердите введенную информацию/i)
      ).not.toBeVisible();
      expect(screen.getByRole("button", { name: /ок/i })).toBeInTheDocument();
    }
  );
  jest.setTimeout(10000);
  it("module Form tests", async () => {
    render(<BaseComponent />);
    const forwardBtn = screen.getByRole("button", { name: /далее/i });
    const backBtn = screen.getByRole("button", { name: /назад/i });
    user.click(forwardBtn);
    const form = screen.getByRole("form");
    const name = within(form).getByPlaceholderText(/имя/i);
    const phone = within(form).getByPlaceholderText(/999-999-99-99/i);
    const email = within(form).getByPlaceholderText(/email/i);

    user.type(name, " ");
    user.type(phone, "qwer123");
    user.type(email, "qwert");
    expect(phone).toHaveValue("(123) ___-____");
    user.click(name);
    expectAlerts({ name: true, email: true, phone: true });
    user.click(forwardBtn);
    expect(name).toBeVisible();
    user.type(name, "Name");
    user.type(phone, "123");
    user.click(forwardBtn);
    expectAlerts({ name: false, email: true, phone: true });
    expect(phone).toHaveValue("(123) 123-____");
    user.type(phone, "55552");
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expectAlerts({ name: false, phone: false, email: true });
    expect(phone).toHaveValue("(123) 123-5555");
    user.click(forwardBtn);
    expect(name).toBeVisible();
    user.type(email, "@mail.ri");
    user.click(forwardBtn);

    const textArea = within(form).getByRole("textbox", {
      name: /описание работы/i
    });
    user.click(backBtn);
    expect(name).toBeVisible();
    expectAlerts({ name: false, email: false, phone: false });
    user.click(forwardBtn);
    expect(name).not.toBeVisible();
    user.type(textArea, "123456789");
    user.click(forwardBtn);
    expect(textArea).toHaveClass("is-invalid");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    user.click(backBtn);
    user.click(forwardBtn);
    expect(textArea).not.toHaveClass("is-invalid");
    expect(textArea).not.toHaveClass("is-valid");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    user.click(forwardBtn);
    expect(textArea).toHaveClass("is-invalid");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    user.type(textArea, "1");
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(textArea).toHaveClass("is-valid");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
