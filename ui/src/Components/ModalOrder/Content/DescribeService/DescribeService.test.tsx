import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { DescribeService } from "./DescribeService";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardType } from "../../../../GraphQL/Query";
import { _GET_SERVICE_CARD } from "../../../../GraphQL/TestQuery";
import {
  serviceCardResp,
  TestError
} from "../../../../mocks/responses/responses";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../Styles/theme";

describe("DescribeService", () => {
  const respEmpty: MockedResponse<GetServiceCardType["GetServiceCard"]> = {
    request: {
      query: _GET_SERVICE_CARD,
      variables: {
        idx: "0"
      }
    },
    result: {
      data: {
        getCards: []
      }
    }
  };
  const errorResp: MockedResponse<GetServiceCardType["GetServiceCard"]> = {
    request: {
      query: _GET_SERVICE_CARD,
      variables: {
        idx: "e"
      }
    },
    error: new TestError()
  };
  const mocks: MockedResponse<GetServiceCardType["GetServiceCard"]>[] = [
    serviceCardResp,
    respEmpty,
    errorResp
  ];
  const BaseComponent = ({ sku }: { sku: string }) => (
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={lightTheme}>
        <DescribeService idx={sku} />
      </ThemeProvider>
    </MockedProvider>
  );

  it("renders correct", async () => {
    render(<BaseComponent sku={"SKU001"} />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(await screen.findByRole("heading")).toBeInTheDocument();
  });
  it("given error state", async () => {
    render(<BaseComponent sku={"e"} />);
    expect(await screen.findByText(/произошла ошибка/i)).toBeInTheDocument();
  });
  it("given empty state", async () => {
    render(<BaseComponent sku={"0"} />);
    expect(await screen.findByText(/произошла ошибка/i)).toBeInTheDocument();
  });
});
