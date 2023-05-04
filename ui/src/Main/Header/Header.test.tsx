import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../Styles/theme";
import { Header } from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Header of main page", () => {
  const BaseComponent = () => (
    <ThemeProvider theme={lightTheme}>
      <Header />
    </ThemeProvider>
  );
  it("Header rendering", () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("link", { name: /finevideo/i })
    ).toBeInTheDocument();
  });
  it("Scroll window and header become fixed", () => {
    render(<BaseComponent />);
    window.scrollY = 900;
    fireEvent(window, new Event("scroll"));
    expect(screen.getByRole("navigation")).toHaveStyle({ position: "fixed" });
  });
});
