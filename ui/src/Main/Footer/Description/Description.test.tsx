import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Description } from "./Description";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../Styles/theme";

it("Description rendering without crashing", () => {
  const screen = render(
    <ThemeProvider theme={lightTheme}>
      <Description />
    </ThemeProvider>
  );
  expect(screen.getByRole("heading", { name: /finevideo/i }));
});
