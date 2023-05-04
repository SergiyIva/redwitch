import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { getRows } from "../../../../../mocks/ordersTable/row";
import { cols, RowsType } from "../../Orders";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../Styles/theme";
import { TableContext } from "../../TableContext/TableContext";
import { initValue } from "../../../../../mocks/ordersTable/context";
import { Table } from "./Table";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";

describe("Table", () => {
  const rows = getRows(9);
  const BaseComponent = ({ rows }: { rows: RowsType }) => {
    return (
      <BrowserRouter>
        <MockedProvider>
          <ThemeProvider theme={lightTheme}>
            <TableContext.Provider value={{ ...initValue, cols, rows }}>
              <Table />
            </TableContext.Provider>
          </ThemeProvider>
        </MockedProvider>
      </BrowserRouter>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent rows={rows} />);
    expect(screen.getAllByRole("row").length).toEqual(11);
    expect(screen.getAllByTestId("dataRow").length).toEqual(9);
  });
  it("get empty orders object, given no data state", () => {
    render(<BaseComponent rows={[]} />);
    expect(screen.getAllByRole("row").length).toEqual(3);
    expect(screen.queryAllByTestId("dataRow").length).toBeFalsy();
  });
  it("change sorting params by clicking on columns", () => {
    render(<BaseComponent rows={rows} />);
    const orderHead = screen.getByRole("columnheader", { name: /orderid/i });
    const serviceHead = screen.getByTestId("ServiceIDtest");
    const topArrow = screen.getByRole("figure", { name: /ascending/i });
    const bottomArrow = screen.getByRole("figure", { name: /descending/i });

    expect(topArrow).toHaveStyle("opacity: 1");
    expect(bottomArrow).toHaveStyle("opacity: 0.3");
    user.click(orderHead);
    expect(topArrow).toHaveStyle("opacity: 0.3");
    expect(bottomArrow).toHaveStyle("opacity: 1");
    user.click(orderHead);
    expect(topArrow).toHaveStyle("opacity: 1");
    expect(bottomArrow).toHaveStyle("opacity: 0.3");
    user.click(serviceHead);
    expect(topArrow).toHaveStyle("opacity: 0.3");
    expect(bottomArrow).toHaveStyle("opacity: 0.3");
    user.click(orderHead);
    expect(topArrow).toHaveStyle("opacity: 1");
    expect(bottomArrow).toHaveStyle("opacity: 0.3");
  });
});
