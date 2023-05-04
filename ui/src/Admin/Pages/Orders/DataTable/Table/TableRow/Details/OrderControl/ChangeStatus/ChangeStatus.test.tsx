import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../../Styles/theme";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { MockedProvider } from "@apollo/client/testing";
import { ChangeStatus } from "./ChangeStatus";

describe("ChangeStatus", () => {
  const row = getRow();
  const BaseComponent = () => {
    return (
      <MockedProvider>
        <ThemeProvider theme={lightTheme}>
          <TableContext.Provider value={{ ...initValue, row }}>
            <ChangeStatus />
          </TableContext.Provider>
        </ThemeProvider>
      </MockedProvider>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("button", { name: /сменить статус/i })
    ).toBeInTheDocument();
  });
});
