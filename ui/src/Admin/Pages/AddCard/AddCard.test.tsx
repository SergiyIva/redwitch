import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import AddCard from "./AddCard";
import { getCardMockData, typeDataReturnFields } from "./Form/Form.test";
import { UPSERT_CARD, UpsertCardType } from "../../../GraphQL/Mutation";
import { fakeCard } from "../../../mocks/serviceCards/serviceCards";
import { BrowserRouter } from "react-router-dom";

export const getVars = (data: ReturnType<typeof getCardMockData>) => ({
  available: data.checkbox === "true",
  describe: data.content,
  name: data.name,
  slug: data.slug,
  price: Number(data.price),
  tags: data.tags.replace(/\s/g, "").split(","),
  file: undefined,
  position: data.position
});

describe("AddCard component", () => {
  const fakeData = getCardMockData();
  const errorData = getCardMockData();
  const mocks: MockedResponse<UpsertCardType["UpsertCard"]>[] = [
    {
      request: {
        query: UPSERT_CARD,
        variables: getVars(fakeData)
      },
      result: {
        data: {
          upsertCard: {
            ...fakeCard(),
            name: fakeData.name,
            slug: fakeData.slug,
            describe: fakeData.content,
            price: fakeData.price,
            position: fakeData.position,
            tags: fakeData.tags.split(","),
            available: fakeData.checkbox === "true"
          }
        }
      }
    },
    {
      request: {
        query: UPSERT_CARD,
        variables: getVars(errorData)
      },
      error: new Error("Test Error")
    }
  ];
  const BaseComponent = () => (
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <AddCard />
      </BrowserRouter>
    </MockedProvider>
  );
  it("Renders without crashing", () => {
    const screen = render(<BaseComponent />);
    expect(screen.getByRole("heading", { name: /добавить новую услугу/i }));
  });
  it("given completed state, renders success message", async () => {
    render(<BaseComponent />);
    const { form, checkbox, btn } = typeDataReturnFields(fakeData);

    if (fakeData.checkbox === "true") user.click(checkbox);
    expect(form).toHaveFormValues({
      name: fakeData.name,
      slug: fakeData.slug,
      content: fakeData.content,
      price: fakeData.price,
      position: fakeData.position,
      tags: fakeData.tags,
      checkbox: fakeData.checkbox === "true"
    });
    user.click(btn);
    expect(screen.getByTestId("spinnerWrapper")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /операция прошла успешно/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /нажмите сюда/i })
    ).toBeInTheDocument();
  });
  it("given error state, renders error message", async () => {
    render(<BaseComponent />);
    const { checkbox, btn } = typeDataReturnFields(errorData);

    if (errorData.checkbox === "true") user.click(checkbox);
    user.click(btn);
    expect(
      await screen.findByRole("heading", { name: /произошла ошибка/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    const tryAgainLink = screen.getByRole("link", { name: /операцию/i });
    expect(tryAgainLink).toBeInTheDocument();
    user.click(tryAgainLink);
    expect(
      await screen.findByRole("heading", { name: /добавить новую услугу/i })
    ).toBeInTheDocument();
  });
});
