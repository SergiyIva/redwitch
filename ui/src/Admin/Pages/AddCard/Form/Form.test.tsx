import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { FetchResult } from "@apollo/client";
import { UpsertCardType } from "../../../../GraphQL/Mutation";
import { Form } from "./Form";
import { faker } from "@faker-js/faker";
import user from "@testing-library/user-event";
import { fakeCard } from "../../../../mocks/serviceCards/serviceCards";

export const getCardMockData = () => ({
  name: faker.random.words(2),
  slug: faker.lorem.words(1),
  content: faker.commerce.productDescription(),
  price: faker.datatype.number(),
  position: faker.datatype.number(),
  tags: faker.lorem.words(5).split(" ").join(", "),
  checkbox: faker.datatype.boolean().toString()
});

export const typeDataReturnFields = (
  data: ReturnType<typeof getCardMockData>
) => {
  const form = screen.getByTestId("cardForm");
  const name = screen.getByLabelText(/название/i);
  const slug = screen.getByLabelText(/краткое описание/i);
  const content = screen.getByTestId("textarea");
  const price = screen.getByLabelText(/стоимость/i);
  const position = screen.getByLabelText(/позиция/i);
  const tags = screen.getByLabelText(/тэги/i);
  const checkbox = screen.getByLabelText(/сделать доступным/i);
  const btn = screen.getByRole("button", { name: /добавить/i });

  user.type(name, data.name);
  user.type(slug, data.slug);
  user.type(content, data.content);
  user.type(price, data.price.toString());
  user.type(position, data.position.toString());
  user.type(tags, data.tags);

  return { form, name, slug, content, price, position, tags, checkbox, btn };
};

describe("Form of addCard page", () => {
  const mockAction = jest.fn(
    () => new Promise<FetchResult<UpsertCardType["UpsertCard"]>>(() => ({}))
  );
  afterEach(() => mockAction.mockRestore());
  it("Form renders correct", async () => {
    render(<Form addCard={mockAction} />);
    expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/краткое описание/i)).toBeInTheDocument();
    expect(await screen.findByText(/выбрать файл/i)).toBeInTheDocument();
  });
  it("type correct data in input fields", () => {
    const mockData = getCardMockData();
    render(<Form addCard={mockAction} />);
    const { form, name, slug, content, price, tags, checkbox, btn } =
      typeDataReturnFields(mockData);

    user.click(checkbox);
    expect(form).toHaveFormValues({
      name: mockData.name,
      slug: mockData.slug,
      content: mockData.content,
      price: mockData.price,
      position: mockData.position,
      tags: mockData.tags,
      checkbox: true
    });
    expect(mockAction).not.toHaveBeenCalled();
    user.click(btn);
    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(name).toHaveClass("is-valid");
    expect(slug).toHaveClass("is-valid");
    expect(content).toHaveClass("is-valid");
    expect(price).toHaveClass("is-valid");
    expect(tags).toHaveClass("is-valid");
  });
  it("type incorrect data, given warning feedback, scrollToTop", () => {
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    const invalidData = {
      name: "   ",
      content: "content",
      price: 123456789012345,
      tags: "   ",
      slug: "",
      position: 0,
      checkbox: "false"
    };
    render(<Form addCard={mockAction} />);
    const { tags, btn } = typeDataReturnFields(invalidData);

    user.click(btn);
    expect(tags).toHaveClass("is-invalid");
    expect(screen.getAllByRole("alert").length).toEqual(5);
    expect(window.scrollTo).toHaveBeenCalled();
  });
  it("edit card form have correct value", () => {
    const mockData = fakeCard();
    render(<Form addCard={mockAction} card={mockData} />);
    const form = screen.getByTestId("cardForm");
    expect(form).toHaveFormValues({
      name: mockData.name,
      slug: mockData.slug,
      content: mockData.describe,
      price: mockData.price,
      position: mockData.position,
      tags: mockData.tags.join(","),
      checkbox: mockData.available
    });
  });
});
