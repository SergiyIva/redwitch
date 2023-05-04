import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../Styles/theme";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Orders from "./Orders";
import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ApolloCache, InMemoryCache } from "@apollo/client";
import { GetOrdersType } from "../../../GraphQL/Query";
import { _GET_ORDERS } from "../../../GraphQL/TestQuery";
import { initValue } from "../../../mocks/ordersTable/context";
import { fakeOrders } from "../../../mocks/ordersTable/orders";
import { TestError } from "../../../mocks/responses/responses";
import { useEffect } from "react";
import { SortDirection } from "../../../GraphQL/typeDefs";

describe("Orders", () => {
  const orders = fakeOrders(10);
  const cache = new InMemoryCache();
  cache.writeQuery<GetOrdersType["GetOrders"], GetOrdersType["GetOrdersVars"]>({
    query: _GET_ORDERS,
    variables: initValue.varsObj,
    data: {
      getOrdersFeed: {
        totalOrders: 1,
        orders: orders.map((o) => ({ ...o, isHidden: false }))
      }
    }
  });
  const responses: MockedResponse<GetOrdersType["GetOrders"]>[] = [
    {
      request: {
        query: _GET_ORDERS,
        variables: initValue.varsObj
      },
      result: {
        data: {
          getOrdersFeed: {
            totalOrders: orders.length,
            orders
          }
        }
      }
    },
    {
      request: {
        query: _GET_ORDERS,
        variables: {
          ...initValue.varsObj,
          filter: { ...initValue.varsObj.filter, onPage: -1 }
        }
      },
      result: {
        data: {
          getOrdersFeed: {
            totalOrders: orders.length,
            orders
          }
        }
      }
    },
    {
      request: {
        query: _GET_ORDERS,
        variables: {
          ...initValue.varsObj,
          sorting: {
            sort: SortDirection.DESCENDING,
            sortBy: "orderNumber"
          },
          filter: {
            ...initValue.varsObj.filter,
            textSearch: "1"
          }
        }
      },
      result: {
        data: {
          getOrdersFeed: {
            totalOrders: orders.length,
            orders: fakeOrders(11)
          }
        }
      }
    },
    {
      request: {
        query: _GET_ORDERS,
        variables: {
          ...initValue.varsObj,
          sorting: {
            sort: SortDirection.ASCENDING,
            sortBy: "name"
          },
          filter: {
            ...initValue.varsObj.filter,
            textSearch: "123"
          }
        }
      },
      result: {
        data: {
          getOrdersFeed: {
            totalOrders: orders.length,
            orders: fakeOrders(9)
          }
        }
      }
    }
  ];

  const emptyResponse = {
    request: {
      query: _GET_ORDERS,
      variables: initValue.varsObj
    },
    result: {
      data: {
        getOrdersFeed: {
          totalOrders: 0,
          orders: []
        }
      }
    }
  };
  const errorResponse = {
    request: {
      query: _GET_ORDERS,
      variables: initValue.varsObj
    },
    error: new TestError()
  };
  const WithRouter = ({ search }: { search: string }) => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate(`orders?${search}`);
    }, []);
    return (
      <Routes>
        <Route index element={<div />} />
        <Route path={"orders"} element={<Orders />} />
      </Routes>
    );
  };
  const BaseComponent = ({
    cache,
    mocks = responses,
    onpage = 10,
    search
  }: {
    cache?: ApolloCache<any>;
    mocks?: MockedResponse<GetOrdersType["GetOrders"]>[];
    onpage?: number;
    search?: string;
  }) => {
    return (
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <MockedProvider cache={cache} mocks={mocks}>
            {search ? (
              <WithRouter search={search} />
            ) : (
              <Routes location={`/orders/${onpage}`}>
                <Route index element={<div />} />
                <Route path={`/orders/:onpage`} element={<Orders />} />
              </Routes>
            )}
          </MockedProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it("renders correct", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect((await screen.findAllByTestId("dataRow")).length).toBe(10);
  });
  it("renders with empty data", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent mocks={[emptyResponse]} />);
    expect(await screen.findByText(/данные не получены/i)).toBeInTheDocument();
  });
  it("renders with error state", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent mocks={[errorResponse]} />);
    expect(
      await screen.findByText(/произошла ошибка: test error/i)
    ).toBeInTheDocument();
  });
  it("load from cache, filter by some params", async () => {
    render(<BaseComponent cache={cache} />);
    const input = screen.getByPlaceholderText(/поиск по результатам/i);
    expect((await screen.findAllByTestId("dataRow")).length).toBe(10);
    user.type(input, orders[0].orderNumber);
    await act(() => new Promise((res) => setTimeout(res, 500)));
    expect(screen.getAllByTestId("dataRow").length).toBe(1);
  });
  it("renders with all data on one page", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent onpage={-1} />);
    expect(
      await screen.findByText(/показано с 1 по 10 из 10 заказов/i)
    ).toBeInTheDocument();
  });
  it.each`
    search                                    | count
    ${"search=1&sortby=orderNumber&sort=dsc"} | ${11}
    ${"search=123&sortby=name&sort=asc"}      | ${9}
  `("renders with various search parameters", async ({ search, count }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent />).rerender(
      <BaseComponent search={search} cache={cache} />
    );
    expect((await screen.findAllByTestId("dataRow")).length).toBe(count);
  });
});
