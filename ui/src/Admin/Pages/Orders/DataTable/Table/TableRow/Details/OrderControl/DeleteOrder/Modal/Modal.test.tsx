import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { GetOrdersType } from "../../../../../../../../../../GraphQL/Query";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { fakeOrder } from "../../../../../../../../../../mocks/ordersTable/orders";
import { getRow } from "../../../../../../../../../../mocks/ordersTable/row";
import { initValue } from "../../../../../../../../../../mocks/ordersTable/context";
import { Modal } from "./Modal";
import { ApolloCache, InMemoryCache } from "@apollo/client";
import {
  DELETE_ORDER,
  DeleteOrderType
} from "../../../../../../../../../../GraphQL/Mutation";
import { RowType } from "../../../../../../../Orders";
import { BrowserRouter } from "react-router-dom";
import { _GET_ORDERS } from "../../../../../../../../../../GraphQL/TestQuery";

describe("Modal of Delete Order", () => {
  const order = fakeOrder();
  const row = getRow(order);
  const mocks: MockedResponse<DeleteOrderType["DeleteOrder"]>[] = [
    {
      request: {
        query: DELETE_ORDER,
        variables: {
          id: row._id
        }
      },
      result: {
        data: {
          deleteOrder: true
        }
      }
    },
    {
      request: {
        query: DELETE_ORDER,
        variables: {
          id: "000"
        }
      },
      result: {
        data: {
          deleteOrder: false
        }
      }
    },
    {
      request: {
        query: DELETE_ORDER,
        variables: {
          id: "111"
        }
      },
      error: new Error("test Error")
    }
  ];
  const cache = new InMemoryCache();
  cache.writeQuery<GetOrdersType["GetOrders"], GetOrdersType["GetOrdersVars"]>({
    query: _GET_ORDERS,
    variables: initValue.varsObj,
    data: {
      getOrdersFeed: {
        totalOrders: 1,
        orders: [{ ...order, isHidden: false }]
      }
    }
  });
  const BaseComponent = ({
    row,
    cache
  }: {
    row: RowType;
    cache?: ApolloCache<any>;
  }) => {
    return (
      <BrowserRouter>
        <TableContext.Provider value={{ ...initValue, row }}>
          <MockedProvider mocks={mocks} cache={cache}>
            <Modal />
          </MockedProvider>
        </TableContext.Provider>
      </BrowserRouter>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent row={row} />);
    expect(
      screen.getByRole("heading", {
        name: /подтвердить удаление/i,
        hidden: true
      })
    );
  });
  it("delete order without cache data success", async () => {
    render(<BaseComponent row={row} />);
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/вы действительно хотите удалить/i)
    ).toBeInTheDocument();
  });
  it("delete order with cache data success", async () => {
    render(<BaseComponent row={row} cache={cache} />);
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/вы действительно хотите удалить/i)
    ).toBeInTheDocument();
  });
  it("delete order with false request", async () => {
    render(<BaseComponent row={{ ...row, _id: "000" }} />);
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(await screen.findByText(/заказ не был удален/i)).toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /операцию/i, hidden: true }));
    expect(
      screen.getByText(/вы действительно хотите удалить/i)
    ).toBeInTheDocument();
  });
  it("delete order with error", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    render(<BaseComponent row={{ ...row, _id: "111" }} />);
    user.click(
      screen.getByRole("button", { name: /подтвердить/i, hidden: true })
    );
    expect(await screen.findByText(/test error/i)).toBeInTheDocument();
  });
});
