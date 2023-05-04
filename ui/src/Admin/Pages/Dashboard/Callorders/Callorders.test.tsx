import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { callordersResp } from "../../../../mocks/responses/responses";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Callorders } from "./Callorders";
import { GET_CALLORDERS, GetCallorders } from "../../../../GraphQL/Query";
import { BrowserRouter } from "react-router-dom";

describe("Callorders component", () => {
  const mocks = [callordersResp];
  it("given completed state, after loading", async () => {
    const screen = render(
      <MockedProvider mocks={mocks}>
        <Callorders />
      </MockedProvider>
    );
    expect(screen.getByTestId("spinnerWrapper")).toBeInTheDocument();
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(
      screen.getByRole("heading", { name: /последние контакты/i })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("orderRow").length).toEqual(5);
  });
  it("given error state, show special admin error-query component with error msg", async () => {
    const errorMocks: MockedResponse<GetCallorders>[] = [
      {
        request: {
          query: GET_CALLORDERS
        },
        error: new Error("Test Error")
      }
    ];
    const screen = render(
      <MockedProvider mocks={errorMocks}>
        <BrowserRouter>
          <Callorders />
        </BrowserRouter>
      </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(
      screen.getByRole("heading", { name: /произошла ошибка/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
  it("given empty state message in document's body", async () => {
    const emptyMocks: MockedResponse<GetCallorders>[] = [
      {
        request: {
          query: GET_CALLORDERS
        },
        result: {
          data: {
            getCallorders: []
          }
        }
      }
    ];
    const screen = render(
      <MockedProvider mocks={emptyMocks}>
        <Callorders />
      </MockedProvider>
    );
    expect(await screen.findByText(/нет контактов/i)).toBeInTheDocument();
  });
});
