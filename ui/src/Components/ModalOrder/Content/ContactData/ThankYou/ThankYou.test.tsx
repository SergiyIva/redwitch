import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { ThankYou } from "./ThankYou";
import { lightTheme } from "../../../../../Styles/theme";

describe("ThankYou", () => {
  const email = faker.internet.email();
  it("renders correct", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ThankYou mail={email} />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("heading", { name: /благодарим/i })
    ).toBeInTheDocument();
    expect(screen.getByText(email, { exact: false })).toBeInTheDocument();
  });
});
