import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Form, FormProps } from "./Form";

describe("Form of ContactData", () => {
  const value: FormProps["formValue"]["value"] = {
    content: faker.lorem.words(5),
    email: faker.internet.email(),
    phone: faker.phone.number("##########"),
    checkbox: faker.datatype.boolean().toString(),
    name: faker.name.firstName()
  };
  const onChange = jest.fn(() => {});
  const checkValid = jest.fn(() => {});
  it("renders correct", () => {
    render(
      <Form
        formValue={{ value, onChange }}
        validMessages={null}
        checkValid={checkValid}
        isFirstStage={true}
      />
    );
    expect(
      screen.getByText(/мы не передаем личные данные третьим лицам/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/имя/i)).toHaveFocus();
  });
  it("type in form way to execute functions", async () => {
    render(
      <Form
        formValue={{ value, onChange }}
        validMessages={null}
        checkValid={checkValid}
        isFirstStage={true}
      />
    );
    const nameInput = screen.getByPlaceholderText(/имя/i);
    user.type(nameInput, "TEst Name");
    expect(onChange).toHaveBeenCalled();
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(checkValid).toHaveBeenCalledTimes(1);
    user.click(screen.getByPlaceholderText(/email/i));
    expect(checkValid).toHaveBeenCalledTimes(2);
    expect(screen.queryByPlaceholderText(/описание работы/i)).not.toBeVisible();
  });
});
