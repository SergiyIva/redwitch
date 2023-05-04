import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ThankYou } from "./ThankYou";
import { lightTheme } from "../../../../../../Styles/theme";
import { ThemeProvider } from "styled-components";

describe("ThankYou", () => {
  it("renders correct", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ThankYou />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("heading", { name: /благодарим за обращение/i })
    ).toBeInTheDocument();
  });
});
