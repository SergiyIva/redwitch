import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Contacts } from "./Contacts";
import { lightTheme } from "../../../Styles/theme";
import { ThemeProvider } from "styled-components";

it("Contacts rendering correct", () => {
  const screen = render(
    <ThemeProvider theme={lightTheme}>
      <Contacts />
    </ThemeProvider>
  );
  expect(
    screen.getByRole("heading", { name: /наши контакты/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /support/i })).toBeInTheDocument();
});
