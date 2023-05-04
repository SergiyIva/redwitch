import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { getRow } from "../../../../../../mocks/ordersTable/row";
import { cols } from "../../../Orders";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../Styles/theme";
import { TableContext } from "../../../TableContext/TableContext";
import { initValue } from "../../../../../../mocks/ordersTable/context";
import { TableRow } from "./TableRow";
import { MockedProvider } from "@apollo/client/testing";

describe("TableRow", () => {
  const row = getRow();
  const BaseComponent = ({ isOdd }: { isOdd: boolean }) => {
    return (
      <MockedProvider>
        <ThemeProvider theme={lightTheme}>
          <TableContext.Provider value={{ ...initValue, cols }}>
            <table>
              <tbody>
                <TableRow
                  row={row}
                  isOdd={isOdd}
                  sortingName={"name"}
                  maxWidthId={5}
                />
              </tbody>
            </table>
          </TableContext.Provider>
        </ThemeProvider>
      </MockedProvider>
    );
  };
  it("correct renders", () => {
    render(<BaseComponent isOdd={true} />);
    expect(screen.getByRole("row")).toBeInTheDocument();
    expect(screen.getAllByRole("cell").length).toEqual(6);
    const nameCell = screen.getByText(row.name);
    expect(nameCell).toBeInTheDocument();
    expect(nameCell).toHaveStyle("background-color: hsla(152, 34%, 26%, .04)");
  });
  it("row is even, click to open details", () => {
    render(<BaseComponent isOdd={false} />);
    const nameCell = screen.getByText(row.name);
    expect(nameCell).toHaveStyle("background-color: hsla(152, 34%, 26%, .02)");
    expect(screen.getAllByRole("row").length).toEqual(1);
    user.click(screen.getByText(row.orderNumber));
    expect(screen.getAllByRole("row").length).toEqual(2);
    user.click(screen.getByText(row.orderNumber));
    expect(screen.getAllByRole("row").length).toEqual(1);
  });
});
