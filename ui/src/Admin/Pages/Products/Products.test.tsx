import "@testing-library/jest-dom/extend-expect";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardsType } from "../../../GraphQL/Query";
import {
  allServiceCardsResp,
  TestError
} from "../../../mocks/responses/responses";
import Products from "./Products";
import { BrowserRouter } from "react-router-dom";
import { _GET_SERVICE_CARDS } from "../../../GraphQL/TestQuery";

const expectDisabledSelect = async () => {
  const select = await screen.findByRole("combobox", {
    name: /выбрать услугу/i
  });
  expect(select).toBeDisabled();
  const locate = window.location.pathname;
  user.click(screen.getByRole("button", { name: /изменить/i }));
  expect(window.location.pathname).toBe(locate);
};

describe("Products", () => {
  const errorResp: MockedResponse<GetServiceCardsType["GetServiceCards"]> = {
    request: {
      query: _GET_SERVICE_CARDS,
      variables: {
        isAll: true
      }
    },
    error: new TestError()
  };
  const emptyResp: MockedResponse<GetServiceCardsType["GetServiceCards"]> = {
    request: {
      query: _GET_SERVICE_CARDS,
      variables: {
        isAll: true
      }
    },
    result: {
      data: {
        getCards: []
      }
    }
  };
  const BaseComponent = ({
    mocks = [allServiceCardsResp]
  }: {
    mocks?: MockedResponse<GetServiceCardsType["GetServiceCards"]>[];
  }) => (
    <BrowserRouter>
      <MockedProvider mocks={mocks}>
        <Products />
      </MockedProvider>
    </BrowserRouter>
  );
  it("renders correct", async () => {
    render(<BaseComponent />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /витрина/i })
    ).toBeInTheDocument();
    const select = screen.getByRole("combobox", { name: /выбрать услугу/i });
    expect(select).not.toBeDisabled();
    expect(within(select).getAllByRole("option").length).toBe(8);
    user.selectOptions(select, "sku001");
    user.click(screen.getByRole("button", { name: /изменить/i }));
    expect(window.location.pathname.slice(0, -6)).toBe("/admin/edit-card/");
  });
  it("given error state", async () => {
    render(<BaseComponent mocks={[errorResp]} />);
    await expectDisabledSelect();
    expect(
      within(
        screen.getByRole("combobox", { name: /выбрать услугу/i })
      ).getByText(/test error/i)
    ).toBeInTheDocument();
  });
  it("given empty data object", async () => {
    render(<BaseComponent mocks={[emptyResp]} />);
    await expectDisabledSelect();
    expect(
      within(
        screen.getByRole("combobox", { name: /выбрать услугу/i })
      ).getByText(/данные отсутствуют/i)
    ).toBeInTheDocument();
  });
});
