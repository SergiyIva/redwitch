import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getRow } from "../../../../../../../../mocks/ordersTable/row";
import { MockedProvider } from "@apollo/client/testing";
import { allServiceCardsResp } from "../../../../../../../../mocks/responses/responses";
import { TableContext } from "../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../mocks/ordersTable/context";
import { OrderControl } from "./OrderControl";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../Styles/theme";

describe("OrderControl", () => {
  const row = getRow();
  const BaseComponent = () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <MockedProvider mocks={[allServiceCardsResp]}>
          <TableContext.Provider value={{ ...initValue, row }}>
            <OrderControl />
          </TableContext.Provider>
        </MockedProvider>
      </ThemeProvider>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent />);
    expect(screen.getByText(/управление заказом/i)).toBeInTheDocument();
  });
});
