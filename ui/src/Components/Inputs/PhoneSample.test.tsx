import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { PhoneSample } from "./PhoneSample";

describe("PhoneSample", () => {
  it("renders correct", () => {
    const onChange = jest.fn().mockImplementation(() => {});
    const onBlur = jest.fn().mockImplementation(() => {});
    render(
      <>
        <h1>head</h1>
        <PhoneSample
          value={"123"}
          change={onChange}
          message={"isValid"}
          blur={onBlur}
        />
      </>
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("is-valid");
    expect(input).toHaveValue("123");
    user.click(input);
    expect(input).toHaveValue("123");
    user.click(screen.getByRole("heading", { name: /head/i }));
    expect(input).toHaveValue("(123) ___-____");
    user.click(input);
    expect(input).toHaveValue("123");
  });
});
