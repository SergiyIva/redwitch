import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Pagination, PaginationProps } from "./Pagination";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../../Styles/theme";

type MaxPage = {
  (total: number, from: number, to: number): number;
};
const maxPage: MaxPage = (total, from, to) => {
  const res = Math.ceil(total / (to - from + 1));
  return res >= 1 ? res : 1;
};

const startCheck = (current: number, max: number) => {
  const checkLink = (num: number, isPositive: boolean = true) => {
    if (current !== num)
      expect(screen.getByTestId(`${num}pageElt`)).not.toHaveClass("active");
    expect(
      screen.getByRole("link", { name: `${num === 1 ? "first" : num} page` })
    ).toBeInTheDocument();
    if (isPositive && num - current < 2 && num < max) checkLink(num + 1);
    else if (!isPositive && current - num < 2 && num > 1)
      checkLink(num - 1, false);
  };
  checkLink(current);
};

type ExpectLinksArgs = {
  current: number;
  max: number;
};
const expectLinks = ({ current, max }: ExpectLinksArgs) => {
  expect(
    screen.getByRole("link", {
      name: /previous page/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /first page/i
    })
  ).toBeInTheDocument();
  if (current === 1) {
    expect(screen.getByTestId("1pageElt")).toHaveClass("active");
    expect(screen.getByTestId(/prevPageElt/i)).toHaveClass("disabled");
  } else {
    expect(screen.getByTestId(`${current}pageElt`)).toHaveClass("active");
    expect(screen.getByTestId(/prevPageElt/i)).not.toHaveClass("disabled");
  }

  startCheck(current, max);

  expect(
    screen.queryByRole("link", { name: `${max + 1} page` })
  ).not.toBeInTheDocument();

  if (max > 7 && current + 3 < max - 1)
    expect(screen.queryByTestId("midPageElt")).toBeInTheDocument();
  else expect(screen.queryByTestId("midPageElt")).not.toBeInTheDocument();

  if (max !== 1)
    expect(
      screen.getByRole("link", {
        name: `${max} page`
      })
    ).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /next page/i })).toBeInTheDocument();
  if (current !== max)
    expect(screen.getByTestId("nextPageElt")).not.toHaveClass("disabled");
  else expect(screen.getByTestId("nextPageElt")).toHaveClass("disabled");
};

describe("Pagination", () => {
  const BaseComponent = ({
    onPage,
    currentPage,
    total,
    onPageToMax,
    onPageFrom
  }: PaginationProps) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Pagination
            total={total}
            onPage={onPage}
            onPageToMax={onPageToMax}
            onPageFrom={onPageFrom}
            currentPage={currentPage}
          />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  it.each`
    onPage | total  | currentPage
    ${10}  | ${20}  | ${1}
    ${100} | ${9}   | ${1}
    ${10}  | ${100} | ${3}
    ${10}  | ${205} | ${11}
    ${25}  | ${200} | ${8}
  `("renders with variable page data", ({ onPage, total, currentPage }) => {
    const onPageFrom = currentPage * onPage - onPage + 1;
    const onPageToMax = currentPage * onPage;
    render(
      <BaseComponent
        onPage={onPage}
        total={total}
        onPageFrom={onPageFrom}
        currentPage={currentPage}
        onPageToMax={onPageToMax}
      />
    );
    expectLinks({
      current: currentPage,
      max: maxPage(total, onPageFrom, onPageToMax)
    });
  });
  it("click on another page and correct navigates", () => {
    render(
      <BaseComponent
        onPage={10}
        total={30}
        onPageFrom={1}
        currentPage={1}
        onPageToMax={10}
      />
    );
    expectLinks({
      current: 1,
      max: maxPage(30, 1, 10)
    });
    user.click(screen.getByRole("link", { name: "3 page" }));
    expect(window.location.pathname).toBe("/admin/orders/10/3");
  });
});
