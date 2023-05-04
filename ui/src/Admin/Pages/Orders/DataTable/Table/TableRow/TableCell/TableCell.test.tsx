import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { lightTheme } from "../../../../../../../Styles/theme";
import { getRow } from "../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { initValue } from "../../../../../../../mocks/ordersTable/context";
import { TableContext } from "../../../../TableContext/TableContext";
import { TableCell } from "./TableCell";
import { cols, ColType } from "../../../../Orders";

describe("TableCell", () => {
  const row = getRow();
  const BaseComponent = ({ col }: { col: ColType }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider value={{ ...initValue, row }}>
          <TableCell isHidden={false} col={col} />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it.each([cols])("renders correct", (col) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent col={col} />);
    expect(screen.getByRole("cell")).toBeInTheDocument();
    expect(screen.getByRole("cell")).toBeVisible();
  });
});
