import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../Styles/theme";
import { MockedProvider } from "@apollo/client/testing";
import { ModalOrder } from "./ModalOrder";
import { serviceCardResp } from "../../mocks/responses/responses";
import { orderSKUVar } from "../../GraphQL/Cache";

describe("ModalOrder", () => {
  const mocks = [serviceCardResp];
  const BaseComponent = () => (
    <ThemeProvider theme={lightTheme}>
      <MockedProvider mocks={mocks}>
        <ModalOrder />
      </MockedProvider>
    </ThemeProvider>
  );
  it("renders correct", () => {
    render(<BaseComponent />);
    expect(
      screen.queryByRole("heading", {
        name: /оформление заявки/i,
        hidden: true
      })
    ).not.toBeInTheDocument();
    act(() => {
      orderSKUVar("SKU001");
    });
    expect(
      screen.getByRole("heading", { name: /оформление заявки/i, hidden: true })
    ).toBeInTheDocument();
  });
});
