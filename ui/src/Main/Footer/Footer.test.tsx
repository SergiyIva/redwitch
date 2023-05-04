import "@testing-library/jest-dom/extend-expect";
import { Footer } from "./Footer";
import { render } from "@testing-library/react";
import { lightTheme } from "../../Styles/theme";
import { ThemeProvider } from "styled-components";

it("Footer rendering without crashing", () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Footer />
    </ThemeProvider>
  );
});
