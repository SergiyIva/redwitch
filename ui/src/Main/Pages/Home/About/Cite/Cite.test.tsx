import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
//@ts-ignore
import faker from "faker";
import { Cite as CiteType } from "../../../../../GraphQL/typeDefs";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Cite } from "./Cite";
import { GET_RANDOM_CITE, GetRandomCite } from "../../../../../GraphQL/Query";

describe("Cite render with correct state", () => {
  const fakeCite: CiteType = {
    id: faker.datatype.uuid(),
    content: faker.random.words(),
    random: faker.datatype.float()
  };
  const mocks: MockedResponse<GetRandomCite>[] = [
    {
      request: { query: GET_RANDOM_CITE },
      result: {
        data: {
          getRandomCite: fakeCite
        }
      }
    }
  ];
  const BaseComponent = () => (
    <MockedProvider mocks={mocks}>
      <Cite />
    </MockedProvider>
  );
  it("given load state, show spinner", () => {
    const screen = render(<BaseComponent />);
    expect(screen.getByTestId("spinnerWrapper")).toBeInTheDocument();
  });
  it("given completed state, renders data", async () => {
    const screen = render(<BaseComponent />);
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText(fakeCite.content)).toBeInTheDocument();
  });
  it("given error state, renders error message", async () => {
    const errorMocks: MockedResponse<GetRandomCite>[] = [
      {
        request: {
          query: GET_RANDOM_CITE
        },
        error: new Error("Test Error")
      }
    ];
    const screen = render(
      <MockedProvider mocks={errorMocks}>
        <Cite />
      </MockedProvider>
    );
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
