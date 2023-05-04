import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { serviceCardsResp } from "../../../../mocks/responses/responses";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Cards } from "./Cards";
import { GetServiceCardsType } from "../../../../GraphQL/Query";
import { _GET_SERVICE_CARDS } from "../../../../GraphQL/TestQuery";

describe("Cards", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  const errorResp: MockedResponse<GetServiceCardsType["GetServiceCards"]>[] = [
    {
      request: {
        query: _GET_SERVICE_CARDS
      },
      error: new Error("Test Error")
    }
  ];
  const emptyResp: MockedResponse<GetServiceCardsType["GetServiceCards"]>[] = [
    {
      request: {
        query: _GET_SERVICE_CARDS
      },
      result: {
        data: {
          getCards: []
        }
      }
    }
  ];
  const mocks = [serviceCardsResp];

  const BaseComponent = ({
    mocks
  }: {
    mocks: MockedResponse<GetServiceCardsType["GetServiceCards"]>[];
  }) => {
    return (
      <MockedProvider mocks={mocks}>
        <Cards />
      </MockedProvider>
    );
  };
  it("renders correct", async () => {
    render(<BaseComponent mocks={mocks} />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    const imgs = await screen.findAllByRole("img", { hidden: true });
    expect(imgs.length).toBe(6);
  });
  it("get error from query", async () => {
    render(<BaseComponent mocks={errorResp} />);
    expect(await screen.findByText(/test error/i)).toBeInTheDocument();
  });
  it("get empty data array from query", async () => {
    render(<BaseComponent mocks={emptyResp} />);
    expect(await screen.findByText(/нет доступных услуг/i)).toBeInTheDocument();
  });
});
