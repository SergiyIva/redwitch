import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useFormInput } from "../../Hooks/useFormInput";
import { calcCountByPosition, calcPositionByCount, Phone } from "./Phone";

type Code = "ArrowUp" | "ArrowLeft" | "ArrowRight";

class ArrowEvent extends Event {
  private readonly _code: Code;
  constructor(code: Code) {
    super("keydown");
    this._code = code;
  }
  get code() {
    return this._code;
  }
}

describe("Phone", () => {
  const onBlur = jest.fn().mockImplementation(() => {});
  it("calculate position by count function", () => {
    const res = calcPositionByCount(7);
    expect(res).toBe(11);
  });
  it("calculate count by position function", () => {
    const res = calcCountByPosition(13);
    expect(res).toBe(9);
  });
  it("renders correct", () => {
    const onChange = jest.fn().mockImplementation(() => {});
    render(
      <Phone
        value={"123"}
        change={onChange}
        message={"isValid"}
        blur={onBlur}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("is-valid");
    expect(input).toHaveValue("(123) ___-____");
  });
  it("type value, calls funcs", async () => {
    const WithUseInput = () => {
      const [formValue] = useFormInput({ phone: "" });
      return (
        <Phone
          value={formValue.value.phone}
          change={formValue.onChange}
          message={"notValid"}
          blur={onBlur}
        />
      );
    };
    render(<WithUseInput />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("is-invalid");
    user.click(input);
    user.type(input, "111", { initialSelectionEnd: 8 });
    expect(input).toHaveValue("(111) ___-____");
    user.clear(input);
    user.click(input);
    user.type(input, "7778");
    expect(input).toHaveValue("(777) 8__-____");
    fireEvent(input, new ArrowEvent("ArrowRight"));
    user.type(input, "{backspace}");
    expect(input).toHaveValue("(777) ___-____");
    fireEvent(input, new ArrowEvent("ArrowLeft"));
    fireEvent(input, new ArrowEvent("ArrowUp"));
    fireEvent(input, new ArrowEvent("ArrowRight"));
    user.clear(input);
    user.type(input, "");
    fireEvent(input, new ArrowEvent("ArrowLeft"));
  });
});
