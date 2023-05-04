import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getRow } from "../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../Styles/theme";
import { MockedProvider } from "@apollo/client/testing";
import { allServiceCardsResp } from "../../../../../../../mocks/responses/responses";
import { TableContext } from "../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../mocks/ordersTable/context";
import { Details } from "./Details";
import { cols } from "../../../../Orders";

describe("Details", () => {
  const colspan = 4;
  const tailCols = cols.slice(colspan);
  const tailsCount = cols.length - colspan;
  const row = getRow();
  const BaseComponent = () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <MockedProvider mocks={[allServiceCardsResp]}>
          <TableContext.Provider value={{ ...initValue, row }}>
            <table>
              <tbody>
                <tr>
                  <Details colspan={colspan} tailCols={tailCols} />
                </tr>
              </tbody>
            </table>
          </TableContext.Provider>
        </MockedProvider>
      </ThemeProvider>
    );
  };
  it("correct renders", () => {
    render(<BaseComponent />);
    expect(screen.getAllByTestId("listElement").length).toEqual(tailsCount);
  });
});
