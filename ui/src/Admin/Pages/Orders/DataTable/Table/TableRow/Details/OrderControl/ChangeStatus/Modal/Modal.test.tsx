import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { Modal } from "./Modal";
import { initValue } from "../../../../../../../../../../mocks/ordersTable/context";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { getRow } from "../../../../../../../../../../mocks/ordersTable/row";
import { lightTheme } from "../../../../../../../../../../Styles/theme";
import { ThemeProvider } from "styled-components";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  CHANGE_ORDER_STATUS,
  ChangeOrderStatusType
} from "../../../../../../../../../../GraphQL/Mutation";
import { fakeOrder } from "../../../../../../../../../../mocks/ordersTable/orders";
import { StatusVars } from "../../../../../../../../../../GraphQL/typeDefs";
import { BrowserRouter } from "react-router-dom";

describe("Modal of ChangeStatus", () => {
  const order = fakeOrder();
  const row = getRow(order);
  const mocks: MockedResponse<ChangeOrderStatusType["ChangeOrderStatus"]>[] = [
    {
      request: {
        query: CHANGE_ORDER_STATUS,
        variables: {
          id: row._id,
          status: "confirmed"
        }
      },
      result: {
        data: {
          changeOrderStatus: {
            ...order,
            status: StatusVars.confirmed
          }
        }
      }
    },
    {
      request: {
        query: CHANGE_ORDER_STATUS,
        variables: {
          id: row._id,
          status: "cancel"
        }
      },
      error: new Error("test Error")
    }
  ];

  const BaseComponent = () => {
    return (
      <MockedProvider mocks={mocks}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            <TableContext.Provider value={{ ...initValue, row }}>
              <Modal />
            </TableContext.Provider>
          </BrowserRouter>
        </ThemeProvider>
      </MockedProvider>
    );
  };
  it("render correct", () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("heading", {
        name: /изменение статуса заказа/i,
        hidden: true
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/выберите новый статус/i)).toBeInTheDocument();
  });
  it("change status to confirmed success", async () => {
    render(<BaseComponent />);
    user.click(screen.getByTestId("bgLabelconfirmed"));
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/выберите новый статус/i)
    ).toBeInTheDocument();
  });
  it("change status to cancel with error", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    render(<BaseComponent />);
    user.click(screen.getByTestId("bgLabelcancel"));
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(
      await screen.findByText(/произошла ошибка: test error/i)
    ).toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /операцию/i, hidden: true }));
    expect(screen.getByText(/выберите новый статус/i)).toBeInTheDocument();
  });
});
