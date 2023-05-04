import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary complex test", () => {
  const ErrorComponent = () => {
    const throwError = () => {
      throw new Error("Test error");
    };
    return <div>{throwError()}</div>;
  };
  it("display error content message", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    const screen = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("heading", { name: /Что-то пошло не так/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/error: test error/i));
    expect(console.error).toHaveBeenCalled();
  });
  it("given custom fallback component when catch error", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const Fallback = () => <div>Custom fallback</div>;
    const screen = render(
      <ErrorBoundary fallback={Fallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Custom fallback")).toBeInTheDocument();
  });
  it("display children component without error", () => {
    const ClearComponent = () => {
      return <div data-testid={"clearComponent"}>Some child</div>;
    };
    const screen = render(
      <ErrorBoundary>
        <ClearComponent />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("clearComponent")).toBeInTheDocument();
  });
});
