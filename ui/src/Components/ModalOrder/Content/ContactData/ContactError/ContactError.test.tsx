import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { lightTheme } from "../../../../../Styles/theme";
import { ThemeProvider } from "styled-components";
import { ContactError } from "./ContactError";

describe("ContactError", () => {
  it("renders correct", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ContactError />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("heading", { name: /произошла ошибка/i })
    ).toBeInTheDocument();
  });
});
