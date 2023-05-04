import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { cols } from "../../../../../Orders";
import { ListElt } from "./ListElt";
import { TableContext } from "../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../mocks/ordersTable/context";
import { getRow } from "../../../../../../../../mocks/ordersTable/row";
import { getStatus } from "../../TableCell/Cells/StatusCell/StatusCell";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../Styles/theme";

describe("ListElt", () => {
  const row = getRow();
  const toggleOpen = jest.fn(() => {});
  const isOpen = true;
  it.each([cols.slice(1)])("render correct with various columns", (column) => {
    render(
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider
          value={{ ...initValue, row, isOpen, toggleOpen }}
        >
          <ListElt col={column} />
        </TableContext.Provider>
      </ThemeProvider>
    );
    expect(screen.getByText(column.title)).toBeInTheDocument();
    if (column.name === "name") {
      expect(screen.getByText(row.name)).toBeInTheDocument();
    } else if (column.name === "phone") {
      expect(
        screen.getByText("8(" + row.phone.slice(0, 3) + ")", {
          exact: false
        })
      ).toBeInTheDocument();
    } else if (column.name === "subscriber") {
      expect(
        screen.getByText(row.subscriber ? /да/i : /нет/i)
      ).toBeInTheDocument();
    } else if (column.name === "createdAt") {
      expect(
        screen.getByText(new Date(row.createdAt).toLocaleString())
      ).toBeInTheDocument();
    } else if (column.name === "updatedAt") {
      expect(
        screen.getByText(new Date(row.updatedAt).toLocaleString())
      ).toBeInTheDocument();
    } else if (column.name === "status") {
      expect(screen.getByText(getStatus(row.status))).toBeInTheDocument();
    }
  });
});
