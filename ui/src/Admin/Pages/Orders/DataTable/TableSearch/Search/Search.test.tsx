import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { TableContext } from "../../../TableContext/TableContext";
import { initValue } from "../../../../../../mocks/ordersTable/context";
import { ApolloCache, InMemoryCache } from "@apollo/client";
import { GetOrdersType } from "../../../../../../GraphQL/Query";
import { _GET_ORDERS } from "../../../../../../GraphQL/TestQuery";
import { fakeOrders } from "../../../../../../mocks/ordersTable/orders";
import { Search } from "./Search";
import { lightTheme } from "../../../../../../Styles/theme";
import { ThemeProvider } from "styled-components";

describe("Search", () => {
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
  const BaseComponent = ({ cache }: { cache?: ApolloCache<any> }) => (
    <ThemeProvider theme={lightTheme}>
      <MockedProvider cache={cache}>
        <TableContext.Provider value={initValue}>
          <Search />
        </TableContext.Provider>
      </MockedProvider>
    </ThemeProvider>
  );
  it("correct renders", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent />);
    expect(
      screen.getByRole("searchbox", { name: /search/i })
    ).toBeInTheDocument();
  });
  it(
    "filter of orders not work without cache, " +
      "unmount of component shows error in console",
    async () => {
      const container = render(<BaseComponent />);
      const input = screen.getByRole("searchbox", { name: /search/i });
      user.type(input, "123");
      expect(input).toHaveValue("123");
      await act(() => new Promise((res) => setTimeout(res, 300)));
      const onConsoleError = jest.fn().mockImplementation(() => {});
      jest.spyOn(console, "error").mockImplementation(onConsoleError);
      expect(onConsoleError).not.toBeCalled();
      container.unmount();
      expect(onConsoleError).toBeCalledTimes(1);
    }
  );
  it("unmount with cache data", async () => {
    const container = render(<BaseComponent cache={cache} />);
    const onConsoleError = jest.fn().mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(onConsoleError);
    expect(onConsoleError).not.toBeCalled();
    container.unmount();
    expect(onConsoleError).not.toBeCalled();
  });
});
