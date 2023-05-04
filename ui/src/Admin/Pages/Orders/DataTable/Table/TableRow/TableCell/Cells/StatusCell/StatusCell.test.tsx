import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getStatus, StatusCell } from "./StatusCell";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../../Styles/theme";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";

describe("StatusCell", () => {
  const row = getRow();
  const BaseComponent = ({ isHidden }: { isHidden?: boolean }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider value={{ ...initValue, row }}>
          <StatusCell isHidden={isHidden} />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it.each`
    status
    ${"accepted"}
    ${"confirmed"}
    ${"confirmed"}
    ${"inWork"}
    ${"done"}
    ${"cancel"}
    ${"fail"}
  `("getStatus return correct values", ({ status }) => {
    const ruStatus = getStatus(status);
    expect(ruStatus.length).toBeGreaterThanOrEqual(6);
    if (status === "fail") expect(ruStatus).toBe("Ошибка");
  });
  it("renders correct", () => {
    render(<BaseComponent />);
    const status = getStatus(row.status);
    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(status)).toBeVisible();
  });
  it.each`
    isHidden
    ${true}
    ${false}
  `("renders with isHidden prop", ({ isHidden }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent isHidden={isHidden} />);
    const elt = screen.getByText(getStatus(row.status));
    if (!isHidden) expect(elt).toBeVisible();
    else expect(elt).not.toBeVisible();
  });
});
