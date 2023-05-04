import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import { DeleteCard } from "./DeleteCard";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  fakeCard,
  fakeCards
} from "../../../../mocks/serviceCards/serviceCards";
import { DELETE_CARD, DeleteCardType } from "../../../../GraphQL/Mutation";
import { Cardservice } from "../../../../GraphQL/typeDefs";
import user from "@testing-library/user-event";
import { ApolloCache, InMemoryCache } from "@apollo/client";
import { GetServiceCardsType } from "../../../../GraphQL/Query";
import { _GET_SERVICE_CARDS } from "../../../../GraphQL/TestQuery";

type Mocks = MockedResponse<DeleteCardType["DeleteCard"]>[];

const clickConfirmBtn = async (isWait?: boolean) => {
  const btn = screen.getByRole("button", {
    name: /подтвердить/i,
    hidden: true
  });
  user.click(btn);
  if (isWait) await act(() => new Promise((res) => setTimeout(res, 0)));
};

describe("DeleteCard", () => {
  const card = fakeCard();
  const falseCardId = "321";
  const errorCardId = "123";
  const mocks: Mocks = [
    {
      request: {
        query: DELETE_CARD,
        variables: { idx: card.sku }
      },
      result: {
        data: {
          deleteCard: true
        }
      }
    },
    {
      request: {
        query: DELETE_CARD,
        variables: { idx: falseCardId }
      },
      result: {
        data: {
          deleteCard: false
        }
      }
    },
    {
      request: {
        query: DELETE_CARD,
        variables: { idx: errorCardId }
      },
      error: new Error("Test ERROR")
    }
  ];
  const cache = new InMemoryCache();
  cache.writeQuery<
    GetServiceCardsType["GetServiceCards"],
    GetServiceCardsType["GetServiceCardsVars"]
  >({
    query: _GET_SERVICE_CARDS,
    data: {
      getCards: fakeCards(6)
    },
    variables: {
      isAll: true
    }
  });
  const setSuccess = jest.fn((arg: boolean) => () => {});
  const setError = jest.fn((err: Error) => {});
  const BaseComponent = ({
    card,
    cache
  }: {
    card: Cardservice;
    cache?: ApolloCache<any>;
  }) => {
    return (
      <MockedProvider mocks={mocks} cache={cache}>
        <DeleteCard card={card} setSuccess={setSuccess} setError={setError} />
      </MockedProvider>
    );
  };
  it("render success", () => {
    render(<BaseComponent card={card} />);
    expect(
      screen.getByRole("button", { name: /удалить/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/подтвердить удаление/i)).not.toBeVisible();
  });
  //click delete button and then close modal - not testing, cos
  // i'm had confidence in Bootstrap library
  it("click confirm button and given return from onComplete function", async () => {
    render(<BaseComponent card={card} />);
    clickConfirmBtn();
    expect(
      screen.getByRole("status", { name: /spinner/i, hidden: true })
    ).toBeInTheDocument();
    await act(() => new Promise((res) => setTimeout(res, 0)));
    expect(setSuccess).not.toBeCalled();
  });
  it("click confirm button with cards cache and given setSuccess call", async () => {
    render(<BaseComponent card={card} cache={cache} />);
    await clickConfirmBtn(true);
    expect(setSuccess).toBeCalledTimes(1);
    expect(setSuccess).toBeCalledWith(true);
  });
  it("click confirm with cards cache but get false from request", async () => {
    render(<BaseComponent card={{ ...card, sku: falseCardId }} />);
    await clickConfirmBtn(true);
    expect(setSuccess).toBeCalledTimes(1);
    expect(setSuccess).toBeCalledWith(false);
  });
  it("click confirm with error data card and given setError call", async () => {
    render(<BaseComponent card={{ ...card, sku: errorCardId }} />);
    await clickConfirmBtn(true);
    expect(setError).toBeCalledTimes(1);
  });
});
