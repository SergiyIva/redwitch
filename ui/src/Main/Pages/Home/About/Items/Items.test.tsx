import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Items } from "./Items";
import { GET_FEATURES, GetFeatures } from "../../../../../GraphQL/Query";
import { featuresResp } from "../../../../../mocks/responses/responses";

describe("Items render, send request, show correct states", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  const mocks: MockedResponse<GetFeatures>[] = [featuresResp];
  const BaseComponent = () => (
    <MockedProvider mocks={mocks}>
      <Items />
    </MockedProvider>
  );
  it("given initial render, returns loading spinner", () => {
    const screen = render(<BaseComponent />);
    expect(screen.getByTestId("spinnerWrapper")).toBeInTheDocument();
  });
  it("given completed state, renders data", async () => {
    const screen = render(<BaseComponent />);
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getAllByRole("heading", { hidden: true }).length).toEqual(6);
  });
  it("given error state, renderers error message", async () => {
    const errorMocks: MockedResponse<GetFeatures>[] = [
      {
        request: {
          query: GET_FEATURES
        },
        error: new Error("Test Error")
      }
    ];
    const screen = render(
      <MockedProvider mocks={errorMocks}>
        <Items />
      </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
  it("given empty data state, renders no data message", async () => {
    const nullMocks: MockedResponse<GetFeatures>[] = [
      {
        request: { query: GET_FEATURES },
        result: {
          data: {
            getFeatures: []
          }
        }
      }
    ];
    const screen = render(
      <MockedProvider mocks={nullMocks}>
        <Items />
      </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText(/нет данных/i)).toBeInTheDocument();
  });
});
