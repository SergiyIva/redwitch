import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { getRow } from "../../../../../../../../../mocks/ordersTable/row";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../../../../../Styles/theme";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { initValue } from "../../../../../../../../../mocks/ordersTable/context";
import { SubscriberCell } from "./SubscriberCell";

describe("SubscriberCell", () => {
  const row = getRow();
  const BaseComponent = ({
    isHidden,
    isSub
  }: {
    isHidden?: boolean;
    isSub?: boolean;
  }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <TableContext.Provider
          value={{ ...initValue, row: { ...row, subscriber: !!isSub } }}
        >
          <SubscriberCell isHidden={isHidden} />
        </TableContext.Provider>
      </ThemeProvider>
    );
  };
  it("correct renders", () => {
    render(<BaseComponent />);
    expect(screen.getByText(/нет/i)).toBeInTheDocument();
    expect(screen.getByText(/нет/i)).toBeVisible();
  });
  it.each`
    isHidden | isSub
    ${true}  | ${false}
    ${false} | ${false}
    ${false} | ${true}
    ${true}  | ${true}
  `("renders within various states", ({ isHidden, isSub }) => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent isHidden={isHidden} isSub={isSub} />);
    const value = isSub ? "Да" : "Нет";
    expect(screen.getByText(value)).toBeInTheDocument();
    if (!isHidden) {
      expect(screen.getByText(value)).toBeVisible();
    } else {
      expect(screen.getByText(value)).not.toBeVisible();
    }
  });
});
