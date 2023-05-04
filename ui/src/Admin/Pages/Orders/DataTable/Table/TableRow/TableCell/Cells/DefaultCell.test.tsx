import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { getRow } from "../../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../Styles/theme";
import { TableContext } from "../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../mocks/ordersTable/context";
import { DefaultCell } from "./DefaultCell";

describe("DefaultCell", () => {
  const row = getRow();
  const BaseComponent = ({ isHidden }: { isHidden: boolean }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider value={{ ...initValue, row }}>
          <DefaultCell isHidden={isHidden} name={"name"} />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it.each`
    isHidden
    ${true}
    ${false}
  `("correct renders", ({ isHidden }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent isHidden={isHidden} />);
    expect(screen.getByText(row.name)).toBeInTheDocument();
    if (isHidden) expect(screen.getByText(row.name)).not.toBeVisible();
    else expect(screen.getByText(row.name)).toBeVisible();
  });
});
