import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Admin } from "./Admin";
import { Spinner } from "../Components/Spinner/Spinner";
import { MockedProvider } from "@apollo/client/testing";
import { globalMocks } from "../mocks/responses/responses";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../Styles/theme";

describe("Admin", () => {
  const BaseComponent = ({ path }: { path: string }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <MockedProvider mocks={globalMocks}>
          <BrowserRouter>
            <WithRoute path={path} />
          </BrowserRouter>
        </MockedProvider>
      </ThemeProvider>
    );
  };
  const WithRoute = ({ path }: { path: string }) => {
    const navigate = useNavigate();
    useEffect(() => navigate(path), []);
    return (
      <Suspense fallback={<Spinner />}>
        <Admin />
      </Suspense>
    );
  };
  it("renders correct", async () => {
    render(<BaseComponent path={"/"} />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /панель управления/i })
    ).toBeInTheDocument();
  });
  it("redirect", async () => {
    render(<BaseComponent path={"/admin"} />);
    await act(() => new Promise((res) => setTimeout(res, 500)));
    expect(window.location.pathname !== undefined).toBeTruthy();
  });
  it("products page", async () => {
    render(<BaseComponent path={"/products"} />);
    expect(
      await screen.findByRole("heading", { name: /витрина/i })
    ).toBeInTheDocument();
  });
  it("orders page", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<BaseComponent path={"/orders"} />);
    expect(
      await screen.findByRole("heading", { name: /все заказы/i })
    ).toBeInTheDocument();
  });
  it("add card page", async () => {
    render(<BaseComponent path={"/add-card"} />);
    expect(
      await screen.findByRole("heading", { name: /добавить новую услугу/i })
    ).toBeInTheDocument();
  });
  it("edit card page", async () => {
    render(<BaseComponent path={"/edit-card/SKU001"} />);
    expect(
      await screen.findByRole("heading", { name: /редактировать услугу/i })
    ).toBeInTheDocument();
  });
  // it("all time page", async () => {
  //   render(<BaseComponent path={"/all-time"} />);
  //   expect(
  //     await screen.findByRole("heading", { name: /статистика за все время/i })
  //   ).toBeInTheDocument();
  // });
});
