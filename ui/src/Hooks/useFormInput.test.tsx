import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { checkPhone, useFormInput } from "./useFormInput";

const initialValues = {
  checkbox: "false",
  username: "",
  email: "",
  content: "",
  message: "",
  file: "",
  phone: "",
  tags: "",
  another: ""
};

type Keys = keyof typeof initialValues;

describe("useFormInput", () => {
  const Component = () => {
    const [formValues, reset, setSomeValue] = useFormInput(initialValues);
    const checked = (value: string) =>
      value === "checkbox"
        ? {
            checked: formValues.value.checkbox === "true"
          }
        : {};
    const onClickReset = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      reset();
    };
    const onClickValue = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSomeValue("email", "qwerty");
    };
    return (
      <form role={"form"}>
        {Object.keys(formValues.value)
          .filter((v) => v !== "file")
          .map((value) => (
            <div key={value}>
              <label htmlFor={value}>{value}</label>
              <input
                id={value}
                type={value}
                value={formValues.value[value as Keys]}
                name={value === "username" ? "login" : value}
                onChange={formValues.onChange}
                {...checked(value)}
              />
            </div>
          ))}
        <button onClick={onClickReset}>reset</button>
        <button onClick={onClickValue}>set mail</button>
      </form>
    );
  };
  const BaseComponent = () => <Component />;
  it("check phone function", () => {
    const truthyRes1 = checkPhone("1235");
    const truthyRes2 = checkPhone("(123) ___-____");
    const falsyRes1 = checkPhone("asd");
    const falsyRes2 = checkPhone("12345678901");
    expect(truthyRes1).toBeTruthy();
    expect(truthyRes2).toBeTruthy();
    expect(falsyRes1).toBeFalsy();
    expect(falsyRes2).toBeFalsy();
  });
  it("correct functionality", () => {
    render(<BaseComponent />);
    const form = screen.getByRole("form");
    const checkbox = screen.getByRole("checkbox");
    const username = screen.getByRole("textbox", { name: /username/i });
    const email = screen.getByRole("textbox", { name: /email/i });
    const content = screen.getByRole("textbox", { name: /content/i });
    const message = screen.getByRole("textbox", { name: /message/i });
    const phone = screen.getByRole("textbox", { name: /phone/i });
    const tags = screen.getByRole("textbox", { name: /tags/i });
    const another = screen.getByRole("textbox", { name: /another/i });
    user.click(checkbox);
    user.type(username, "123");
    user.type(email, "123");
    user.type(content, "123");
    user.type(message, "123");
    user.type(phone, "123");
    user.type(tags, "123");
    user.type(another, "123");
    expect(form).toHaveFormValues({
      checkbox: true,
      login: "123",
      email: "123",
      content: "123",
      message: "123",
      phone: "123",
      tags: "123",
      another: "123"
    });
    user.clear(email);
    user.type(username, "@mail.");
    expect(username).toHaveValue("");
    expect(email).toHaveValue("123@mail.");
    user.type(username, "1234567890".repeat(20));
    expect(username).toHaveValue("1234567890".repeat(19) + "123456789");
    user.clear(email);
    user.clear(content);
    user.clear(message);
    user.clear(phone);
    user.clear(tags);
    user.clear(another);
    user.type(email, "1234567890".repeat(20));
    expect(email).toHaveValue("1234567890".repeat(19) + "123456789");
    user.type(content, "1234567890".repeat(100));
    expect(content).toHaveValue("1234567890".repeat(99) + "123456789");
    user.type(message, "1234567890".repeat(100));
    expect(message).toHaveValue("1234567890".repeat(99) + "123456789");
    user.type(phone, "12345678901");
    expect(phone).toHaveValue("1234567890");
    user.type(tags, "1234567890".repeat(11));
    expect(tags).toHaveValue("1234567890".repeat(10));
    user.type(another, "1234567890".repeat(4));
    expect(another).toHaveValue("1234567890".repeat(3) + "12");
    user.click(screen.getByRole("button", { name: /reset/i }));
    expect(form).toHaveFormValues({
      checkbox: false,
      login: "",
      email: "",
      content: "",
      message: "",
      phone: "",
      tags: "",
      another: ""
    });
    user.click(screen.getByRole("button", { name: /set mail/i }));
    expect(email).toHaveValue("qwerty");
  });
});
