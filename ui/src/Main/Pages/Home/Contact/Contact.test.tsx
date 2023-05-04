import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../Styles/theme";
import { MockedProvider } from "@apollo/client/testing";

describe("Contact", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  it("renders correct", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <MockedProvider>
          <Contact />
        </MockedProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole("form", { hidden: true })).toBeInTheDocument();
  });
});
