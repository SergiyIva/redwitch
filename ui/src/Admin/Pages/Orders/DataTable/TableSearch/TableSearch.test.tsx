import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../Styles/theme";
import { MockedProvider } from "@apollo/client/testing";
import { TableContext } from "../../TableContext/TableContext";
import { initValue } from "../../../../../mocks/ordersTable/context";
import { BrowserRouter } from "react-router-dom";
import { TableSearch } from "./TableSearch";

describe("TableSearch", () => {
  it("correct renders", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <MockedProvider>
            <TableContext.Provider value={initValue}>
              <TableSearch />
            </TableContext.Provider>
          </MockedProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("searchbox", { name: /search/i })
    ).toBeInTheDocument();
  });
});
