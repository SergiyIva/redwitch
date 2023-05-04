import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { FieldFormWarning } from "./FieldFormWarning";

describe("FieldFormWarning", () => {
  it("renders correct", () => {
    render(<FieldFormWarning />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  it("renders with message error", () => {
    render(<FieldFormWarning value={"Error text"} />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeVisible();
    expect(screen.getByTestId("warningField")).toHaveStyle({
      position: "absolute"
    });
    expect(alert).toHaveTextContent(/error text/i);
  });
  it("renders with valid message and not absolute position and without style props", () => {
    render(
      <FieldFormWarning
        value={"isValid"}
        notAbsolute={true}
        withoutStyle={true}
      />
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByTestId("warningField")).not.toHaveStyle({
      position: "absolute"
    });
    expect(screen.getByTestId("warningField")).not.toHaveStyle({
      textAlign: "center"
    });
  });
});
