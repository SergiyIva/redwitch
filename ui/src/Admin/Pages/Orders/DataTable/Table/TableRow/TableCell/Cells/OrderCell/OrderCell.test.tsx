import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { OrderCell } from "./OrderCell";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../../Styles/theme";

describe("OrderCell", () => {
  const row = getRow();
  const toggleOpen = jest.fn().mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
  const BaseComponent = ({ isOpen }: { isOpen?: boolean }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider
          value={{ ...initValue, row, isOpen, toggleOpen }}
        >
          <OrderCell />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent isOpen={false} />);
    expect(screen.getByText(row.orderNumber)).toBeInTheDocument();
  });
  it("renders with open state, click toggle", () => {
    render(<BaseComponent isOpen={true} />);
    user.click(screen.getByText(row.orderNumber));
    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });
});
