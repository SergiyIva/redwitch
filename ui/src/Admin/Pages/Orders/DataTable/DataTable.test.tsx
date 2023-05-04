import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../Styles/theme";
import { MockedProvider } from "@apollo/client/testing";
import { TableContext } from "../TableContext/TableContext";
import { initValue } from "../../../../mocks/ordersTable/context";
import { fakeOrders } from "../../../../mocks/ordersTable/orders";
import { InMemoryCache } from "@apollo/client";
import { getRow } from "../../../../mocks/ordersTable/row";
import { DataTable } from "./DataTable";
import { cols } from "../Orders";

describe("DataTable", () => {
  const orders = fakeOrders(10);
  const rows = orders.map(getRow);
  const cache = new InMemoryCache();
  it("renders correct", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <MockedProvider cache={cache}>
            <TableContext.Provider value={initValue}>
              <DataTable
                rows={rows}
                cols={cols}
                nonFilterLength={rows.length}
              />
            </TableContext.Provider>
          </MockedProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/показаны 10 из 10/i)).toBeInTheDocument();
  });
});
