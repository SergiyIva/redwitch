import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { getStatus, stages, SubHeader } from "./SubHeader";
import { lightTheme } from "../../../../Styles/theme";

describe("SubHeader", () => {
  const BaseComponent = ({
    stage,
    isHidden
  }: {
    stage: number;
    isHidden: boolean;
  }) => {
    return (
      <ThemeProvider theme={lightTheme}>
        <SubHeader currStage={stage} isHidden={isHidden} />
      </ThemeProvider>
    );
  };
  it.each`
    stage | currStage | res
    ${2}  | ${2}      | ${"active"}
    ${1}  | ${2}      | ${"on"}
    ${2}  | ${1}      | ${"off"}
  `("get status function", ({ stage, currStage, res }) => {
    const status = getStatus(stage, currStage);
    expect(status).toBe(res);
  });
  it("render with hidden state", () => {
    render(<BaseComponent stage={1} isHidden={true} />);
    expect(
      screen.getByRole("heading", { name: /1/i, hidden: true })
    ).toBeInTheDocument();
  });
  it.each`
    currStage
    ${1}
    ${2}
    ${3}
    ${4}
  `("renders correct", ({ currStage }) => {
    render(<BaseComponent stage={currStage} isHidden={false} />);

    for (let i = 1; i < 5; i++) {
      const number = screen.getByRole("heading", { name: i.toString() });
      const numCircle = screen.getByTestId("numCircle" + i);
      const stageName = screen.getByRole("heading", {
        name: stages[i - 1].name
      });
      expect(number).toBeInTheDocument();
      expect(stageName).toBeInTheDocument();
      if (i === currStage) {
        expect(number).toHaveStyle({
          color: "hsl(0,0%,98%)"
        });
        expect(numCircle).toHaveStyle({
          backgroundColor: "hsl(152, 69%, 31%)",
          border: "2px solid hsl(152,69%,27%)"
        });
        expect(stageName).toHaveStyle({
          color: "hsl(152, 69%, 27%)"
        });
      } else if (i < currStage) {
        expect(number).toHaveStyle({
          color: "hsl(152, 69%, 27%)"
        });
        expect(numCircle).toHaveStyle({
          backgroundColor: "hsl(152, 17%, 98%)",
          border: "2px solid hsl(152,69%,27%)"
        });
        expect(stageName).toHaveStyle({
          color: "hsl(0,0%,80%)"
        });
      } else {
        expect(number).toHaveStyle({
          color: "hsl(0,0%,80%)"
        });
        expect(numCircle).toHaveStyle({
          backgroundColor: "hsl(152, 17%, 98%)",
          border: "2px solid hsl(0,0%,80%)"
        });
        expect(stageName).toHaveStyle({
          color: "hsl(0,0%,80%)"
        });
      }
    }
  });
});
