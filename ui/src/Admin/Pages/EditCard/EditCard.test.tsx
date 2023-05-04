import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import EditCard from "./EditCard";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetServiceCardType } from "../../../GraphQL/Query";
import { fakeCard } from "../../../mocks/serviceCards/serviceCards";
import { Cardservice } from "../../../GraphQL/typeDefs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UPSERT_CARD, UpsertCardType } from "../../../GraphQL/Mutation";
import { _GET_SERVICE_CARD } from "../../../GraphQL/TestQuery";
import { TestError } from "../../../mocks/responses/responses";

describe("EditCard", () => {
  const errorResp: MockedResponse<GetServiceCardType["GetServiceCard"]> = {
    request: {
      query: _GET_SERVICE_CARD,
      variables: {
        idx: "123"
      }
    },
    error: new TestError()
  };
  const getResp = (
    arg: string,
    res: Cardservice[]
  ): MockedResponse<GetServiceCardType["GetServiceCard"]> => {
    return {
      request: {
        query: _GET_SERVICE_CARD,
        variables: {
          idx: arg
        }
      },
      result: {
        data: {
          getCards: res
        }
      }
    };
  };
  const card = fakeCard();
  const resp = getResp("111", [card]);
  const emptyResp = getResp("0", []);
  const getUpdateMute = (
    name?: string,
    error?: boolean
  ): MockedResponse<UpsertCardType["UpsertCard"]> => {
    const request = {
      query: UPSERT_CARD,
      variables: {
        name: name || card.name,
        slug: card.slug,
        describe: card.describe,
        price: card.price,
        position: card.position,
        tags: card.tags,
        available: card.available,
        file: undefined
      }
    };
    if (error)
      return {
        request,
        error: new Error("Test Error")
      };
    return {
      request,
      result: {
        data: {
          upsertCard: card
        }
      }
    };
  };
  const updateCardMute = getUpdateMute();
  const errorUpdateMute = getUpdateMute("errorName", true);
  const mocks: MockedResponse<
    GetServiceCardType["GetServiceCard"] | UpsertCardType["UpsertCard"]
  >[] = [resp, errorResp, emptyResp, updateCardMute, errorUpdateMute];
  // пока лучшее решение, что сумел найти по установке pathname в тестах,
  // прямое перенаправление через location.pathname = "" - не работает,
  // использую Route д.т.ч. определить sku в качестве params
  const BaseComponent = ({ sku }: { sku: string }) => {
    return (
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes location={`/edit-card/${sku}`}>
            <Route index element={<div />} />
            <Route path={"/edit-card/:sku"} element={<EditCard />} />
          </Routes>
        </MockedProvider>
      </BrowserRouter>
    );
  };
  it("renders without crashing", async () => {
    render(<BaseComponent sku={"111"} />);
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /редактировать услугу/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /новые данные/i })
    ).toBeInTheDocument();
  });
  it("given error ID of service card and return error component", async () => {
    render(<BaseComponent sku={"123"} />);
    expect(
      await screen.findByText(/произошла ошибка: test error/i)
    ).toBeInTheDocument();
  });
  it("given ID and receive the empty array of data object", async () => {
    render(<BaseComponent sku={"0"} />);
    expect(
      await screen.findByRole("heading", { name: /Нет данных/i })
    ).toBeInTheDocument();
  });
  it("should click delete and remove card data successfully", () => {
    render(<BaseComponent sku={"111"} />);
  });
  it("should get card data in form and then submit it success", async () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    render(<BaseComponent sku={"111"} />);
    const form = await screen.findByTestId("cardForm");
    expect(form).toHaveFormValues({
      name: card.name,
      slug: card.slug,
      content: card.describe,
      price: card.price,
      position: card.position,
      tags: card.tags.join(","),
      checkbox: card.available
    });
    const btn = screen.getByRole("button", { name: /изменить/i });
    user.click(btn);
    expect(
      await screen.findByRole("heading", { name: /операция прошла успешно/i })
    ).toBeInTheDocument();
    user.click(screen.getByRole("link", { name: /нажмите сюда/i }));
    expect(window.location.pathname).toBe("/admin/products");
  });
  it("should get card data, but when edit get error", async () => {
    render(<BaseComponent sku={"111"} />);
    const inputName = await screen.findByRole("textbox", { name: /название/i });
    user.clear(inputName);
    user.type(inputName, "errorName");
    user.click(screen.getByRole("button", { name: /изменить/i }));
    expect(
      screen.getByRole("status", { name: /spinner/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/произошла ошибка: test error/i));
    user.click(screen.getByRole("link", { name: /операцию/i }));
    expect(await screen.findByTestId("cardForm")).toBeInTheDocument();
  });
});
