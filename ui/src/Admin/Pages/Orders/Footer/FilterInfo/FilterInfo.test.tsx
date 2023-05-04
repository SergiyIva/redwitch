import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FilterInfo, FilterInfoProps } from "./FilterInfo";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../Styles/theme";

describe("FilterInfo", () => {
  const BaseComponent = ({
    total,
    onPageToMax,
    onPageFrom
  }: FilterInfoProps) => (
    <ThemeProvider theme={lightTheme}>
      <FilterInfo
        onPageFrom={onPageFrom}
        onPageToMax={onPageToMax}
        total={total}
      />
    </ThemeProvider>
  );
  it("renders correct", () => {
    render(<BaseComponent onPageFrom={1} onPageToMax={10} total={20} />);
    expect(
      screen.getByText(/показано с 1 по 10 из 20 заказов/i)
    ).toBeInTheDocument();
  });
  it("renders correct with total value smaller then pageMax", () => {
    render(<BaseComponent onPageFrom={1} onPageToMax={10} total={9} />);
    expect(
      screen.getByText(/показано с 1 по 9 из 9 заказов/i)
    ).toBeInTheDocument();
  });
});
