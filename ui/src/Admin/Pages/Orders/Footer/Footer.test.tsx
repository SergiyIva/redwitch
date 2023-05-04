import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Footer } from "./Footer";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../Styles/theme";
import { BrowserRouter } from "react-router-dom";

describe("Footer of Table Orders", () => {
  it("correct render", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Footer
            total={20}
            onPage={10}
            onPageFrom={11}
            onPageToMax={20}
            currentPage={2}
          />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(
      screen.getByRole("link", { name: "first page" })
    ).toBeInTheDocument();
    expect(screen.getByText(/показано с 11 по 20/i)).toBeInTheDocument();
  });
});
