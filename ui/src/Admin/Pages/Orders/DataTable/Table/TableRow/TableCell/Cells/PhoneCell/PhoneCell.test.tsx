import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../../Styles/theme";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { PhoneCell } from "./PhoneCell";

describe("PhoneCell", () => {
  const row = getRow();
  const BaseComponent = ({ isHidden }: { isHidden?: boolean }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider value={{ ...initValue, row }}>
          <PhoneCell isHidden={isHidden} />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it("renders correct", () => {
    render(<BaseComponent />);
    const elt = screen.getByText("8(" + row.phone.slice(0, 3) + ")", {
      exact: false
    });
    expect(elt).toBeInTheDocument();
    expect(elt).toBeVisible();
  });
  it.each`
    isHidden
    ${true}
    ${false}
  `("renders with special state of hidden", ({ isHidden }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent isHidden={isHidden} />);
    const elt = screen.getByText("8(" + row.phone.slice(0, 3) + ")", {
      exact: false
    });
    if (!isHidden) expect(elt).toBeVisible();
    else expect(elt).not.toBeVisible();
  });
});
