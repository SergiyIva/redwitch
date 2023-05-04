import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import user from "@testing-library/user-event";

describe("Header component in admin side", () => {
  const BaseComponent = () => (
    <MockedProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </MockedProvider>
  );
  it("correct render", () => {
    const screen = render(<BaseComponent />);
    expect(screen.getByTestId("navbarToggler")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /администрирование/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /выйти/i })).toBeInTheDocument();
  });
  it("click logout btn and clear Storage", () => {
    localStorage.setItem("token", "1234");
    sessionStorage.setItem("token", "1234");
    expect(localStorage.getItem("token")).toBe("1234");
    const screen = render(<BaseComponent />);
    const btn = screen.getByRole("link", { name: /выйти/i });
    user.click(btn);
    expect(localStorage.getItem("token")).not.toBeTruthy();
    expect(sessionStorage.getItem("token")).not.toBeTruthy();
    expect(location.pathname).toBe("/");
  });
});
