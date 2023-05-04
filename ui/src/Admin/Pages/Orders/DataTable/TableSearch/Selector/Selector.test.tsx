import "@testing-library/jest-dom/extend-expect";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import Router, { BrowserRouter } from "react-router-dom";
import { Selector, selectValues } from "./Selector";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

const expectPage = (onPage: string) => {
  const select = screen.getByRole("combobox", {
    name: /показать/i
  });
  user.selectOptions(select, onPage);
  expect(window.location.pathname).toBe(`/admin/orders/${onPage}/1`);
  if (onPage === "-1") expect(screen.getByText(/заказы/i)).toBeInTheDocument();
  else expect(screen.getByText(/заказов/i)).toBeInTheDocument();
};

describe("Selector", () => {
  const BaseComponent = () => (
    <BrowserRouter>
      <Selector />
    </BrowserRouter>
  );
  it("renders correct", () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    render(<BaseComponent />);
    const select = screen.getByRole("combobox", {
      name: /показать/i
    });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("10");
    expect(within(select).getAllByRole("option").length).toBe(
      selectValues.length
    );
  });
  it.each(["25", "-1", "100"])("change on page count", (onpage) => {
    jest.spyOn(Router, "useParams").mockReturnValue({ onpage });
    render(<BaseComponent />);
    expectPage(onpage);
  });
});
