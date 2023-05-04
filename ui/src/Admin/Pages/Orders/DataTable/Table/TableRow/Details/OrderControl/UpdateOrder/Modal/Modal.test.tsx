import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardsType } from "../../../../../../../../../../GraphQL/Query";
import { fakeOrder } from "../../../../../../../../../../mocks/ordersTable/orders";
import { getRow } from "../../../../../../../../../../mocks/ordersTable/row";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../../mocks/ordersTable/context";
import { Modal } from "./Modal";
import { UpdateOrderType } from "../../../../../../../../../../GraphQL/Mutation";
import {
  fakeCard,
  fakeCards
} from "../../../../../../../../../../mocks/serviceCards/serviceCards";
import { _GET_SERVICE_CARDS } from "../../../../../../../../../../GraphQL/TestQuery";
import { TestError } from "../../../../../../../../../../mocks/responses/responses";
import { BrowserRouter } from "react-router-dom";
import { _UPDATE_ORDER } from "../../../../../../../../../../GraphQL/TestMute";

describe("UpdateOrder", () => {
  const order = fakeOrder();
  const mock: MockedResponse<GetServiceCardsType["GetServiceCards"]> = {
    request: {
      query: _GET_SERVICE_CARDS,
      variables: {
        isAll: true
      }
    },
    result: {
      data: {
        getCards: [...fakeCards(2), fakeCard(order.service.sku)]
      }
    }
  };
  const update: MockedResponse<UpdateOrderType["UpdateOrder"]> = {
    request: {
      query: _UPDATE_ORDER,
      variables: {
        sku: order.service.sku,
        name: "Update",
        phone: order.phone,
        email: order.email,
        subscriber: order.subscriber,
        description: order.description,
        content: order.description,
        checkbox: order.subscriber.toString(),
        id: order._id
      }
    },
    result: {
      data: {
        updateOrder: order
      }
    }
  };
  const updateError: MockedResponse<UpdateOrderType["UpdateOrder"]> = {
    request: {
      query: _UPDATE_ORDER,
      variables: {
        sku: order.service.sku,
        name: order.name,
        phone: order.phone,
        email: order.email,
        subscriber: order.subscriber,
        description: "description for error",
        content: "description for error",
        checkbox: order.subscriber.toString(),
        id: order._id
      }
    },
    error: new TestError()
  };
  const mocks: MockedResponse<
    GetServiceCardsType["GetServiceCards"] | UpdateOrderType["UpdateOrder"]
  >[] = [mock, update, updateError];
  const row = getRow(order);
  const BaseComponent = () => {
    return (
      <BrowserRouter>
        <MockedProvider mocks={mocks}>
          <TableContext.Provider value={{ ...initValue, row }}>
            <Modal />
          </TableContext.Provider>
        </MockedProvider>
      </BrowserRouter>
    );
  };
  it("renders correct", async () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /изменение данных/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/внесите изменения в заказ/i)
    ).toBeInTheDocument();
  });
  it("typing form data, functions calls check", async () => {
    render(<BaseComponent />);
    const select = await screen.findByLabelText(/выбрать услугу/i);
    const name = screen.getByLabelText(/имя клиента/i);
    const phone = screen.getByLabelText(/телефон/i);
    const email = screen.getByLabelText(/email/i);
    user.click(email);
    user.selectOptions(select, order.service.sku);
    user.clear(name);
    user.clear(phone);
    expect(email).toHaveClass("is-valid");
    expect(name).toHaveClass("is-invalid");
    const nameFeedback = screen.getByText(/заполните поле имя/i);
    expect(nameFeedback).toBeInTheDocument();
    user.type(name, "Name");

    user.clear(email);
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(name).toHaveClass("is-valid");
    expect(nameFeedback).not.toBeInTheDocument();
    expect(phone).toHaveValue("(___) ___-____");
    expect(
      screen.getByText(/заполните поле номер телефона/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/999-999-99-99/i)).toHaveClass(
      "is-invalid"
    );
    expect(email).toHaveClass("is-invalid");

    user.click(
      screen.getByRole("button", { name: /начальные значения/i, hidden: true })
    );
    expect(screen.queryAllByRole("alert", { hidden: true }).length).toEqual(0);
    expect(name).toHaveValue(order.name);

    user.clear(name);
    user.type(name, "Update");
    expect(nameFeedback).not.toBeInTheDocument();
    user.click(
      screen.getByRole("button", { name: /сохранить/i, hidden: true })
    );
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/внесите изменения в заказ/i)
    ).toBeInTheDocument();
  });
  it("change field, send data and given error", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    render(<BaseComponent />);
    const content = await screen.findByLabelText(/описание работы/i);
    user.clear(content);
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(content).toHaveClass("is-invalid");
    user.type(content, "description for error");
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(screen.getByLabelText(/описание/i)).toHaveClass("is-valid");
    user.click(
      screen.getByRole("button", { name: /сохранить/i, hidden: true })
    );
    expect(
      await screen.findByText(/произошла ошибка: test error/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /сохранить/i, hidden: true })
    ).not.toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /операцию/i, hidden: true }));
    expect(screen.getByText(/внесите изменения/i)).toBeInTheDocument();
  });
});
