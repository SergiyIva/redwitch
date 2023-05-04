import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { CurveLine } from "./CurveLine";

it("CurveLine correct rendering without crashing", () => {
  render(<CurveLine color={"#fff"} />);
  const line = screen.getByTestId("curveline");
  expect(line).toBeInTheDocument();
  expect(line).toHaveStyle({
    backgroundColor: "transparent"
  });
});

it("CurveLine render with position relative", () => {
  render(<CurveLine color={"#fff"} isAbs={true} />);
  const container = screen.getByTestId("curvelineWrapper");
  expect(container).toHaveStyle({
    position: "relative"
  });
});
