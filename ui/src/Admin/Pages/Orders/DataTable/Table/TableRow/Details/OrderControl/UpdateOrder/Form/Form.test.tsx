import { act, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { Form } from "./Form";
import { fakeOrder } from "../../../../../../../../../../mocks/ordersTable/orders";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardsType } from "../../../../../../../../../../GraphQL/Query";
import {
  fakeCard,
  fakeCards
} from "../../../../../../../../../../mocks/serviceCards/serviceCards";
import { _GET_SERVICE_CARDS } from "../../../../../../../../../../GraphQL/TestQuery";

describe("Form of UpdateOrder", () => {
  const onChange = jest.fn(() => {});
  const checkValid = jest.fn(() => {});
  const onReset = jest.fn(() => {});
  const order = fakeOrder();
  const checkFormValues = () => {
    expect(screen.getByLabelText(/имя клиента/i)).toHaveValue(order.name);
    expect(screen.getByLabelText(/телефон/i)).toHaveValue(order.phone);
    expect(screen.getByLabelText(/email/i)).toHaveValue(order.email);
    expect(screen.getByLabelText(/описание работы/i)).toHaveValue(
      order.description
    );
    const checkbox = screen.getByLabelText(/клиент подписан/i);
    if (order.subscriber) expect(checkbox).toBeChecked();
    else expect(checkbox).not.toBeChecked();
  };
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
  const emptyMock: MockedResponse<GetServiceCardsType["GetServiceCards"]> = {
    request: {
      query: _GET_SERVICE_CARDS,
      variables: {
        isAll: true
      }
    },
    result: {
      data: {
        getCards: []
      }
    }
  };
  const errorMock: MockedResponse<GetServiceCardsType["GetServiceCards"]> = {
    request: {
      query: _GET_SERVICE_CARDS,
      variables: {
        isAll: true
      }
    },
    error: new Error("Test Error")
  };
  const BaseComponent = ({
    mock
  }: {
    mock: MockedResponse<GetServiceCardsType["GetServiceCards"]>;
  }) => {
    return (
      <MockedProvider mocks={[mock]}>
        <Form
          formValue={{
            value: {
              sku: order.service.sku,
              phone: order.phone,
              name: order.name,
              checkbox: order.subscriber.toString(),
              email: order.email,
              content: order.description
            },
            onChange: onChange
          }}
          validMessages={null}
          checkValid={checkValid}
          onReset={onReset}
        />
      </MockedProvider>
    );
  };
  it("renders correct, given success request", async () => {
    render(<BaseComponent mock={mock} />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    const select = await screen.findByLabelText(/выбрать услугу/i);
    expect(within(select).getAllByRole("option").length).toEqual(3);
    expect(select).toHaveValue(order.service.sku);
    checkFormValues();
  });
  it("renders without cards data from error reason", async () => {
    render(<BaseComponent mock={errorMock} />);
    const select = await screen.findByLabelText(/выбрать услугу/i);
    expect(select).toHaveTextContent(/test error/i);
    expect(select).toHaveAttribute("disabled");
    checkFormValues();
  });
  it("get empty cards data, given no data option", async () => {
    render(<BaseComponent mock={emptyMock} />);
    expect(
      await screen.findByRole("option", { name: /нет данных/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/выбрать услугу/i)).toHaveAttribute(
      "disabled"
    );
  });
  it("correct calls functions when typing values", async () => {
    render(<BaseComponent mock={mock} />);
    const select = await screen.findByLabelText(/выбрать услугу/i);
    const name = screen.getByLabelText(/имя клиента/i);
    const phone = screen.getByLabelText(/телефон/i);
    user.selectOptions(select, order.service.sku);
    user.clear(name);
    expect(checkValid).not.toHaveBeenCalled();
    user.clear(phone);
    expect(checkValid).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
    user.type(name, "Name");
    expect(checkValid).toHaveBeenCalledTimes(2);
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(checkValid).toHaveBeenCalledTimes(3);
    user.click(screen.getByRole("button", { name: /начальные значения/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
