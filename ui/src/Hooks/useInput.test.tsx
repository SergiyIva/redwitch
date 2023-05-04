import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useInput } from "./useInput";

describe("useInput", () => {
  const BaseComponent = () => {
    return <Component />;
  };
  const Component = () => {
    const [valueInput, reset] = useInput("name");
    return (
      <div>
        <div>
          <label htmlFor={"name"}>name</label>
          <input
            id={"name"}
            name={"name"}
            value={valueInput.value}
            onChange={valueInput.onChange}
          />
        </div>
        <button onClick={reset}>reset</button>
      </div>
    );
  };
  it("correct functionality", () => {
    render(<BaseComponent />);
    const input = screen.getByRole("textbox", { name: /name/i });
    expect(input).toHaveValue("name");
    user.type(input, "123");
    expect(input).toHaveValue("name123");
    user.click(screen.getByRole("button", { name: /reset/i }));
    expect(input).toHaveValue("name");
  });
});
