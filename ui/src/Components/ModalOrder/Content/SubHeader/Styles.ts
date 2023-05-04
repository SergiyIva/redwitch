import styled, { css } from "styled-components";
import { getTransition } from "../../../../Styles/utilites";

type SubHeaderProps = {
  isHidden?: boolean;
};
export const SubHeader = styled.div<SubHeaderProps>`
  ${({ isHidden }) =>
    isHidden &&
    css`
      display: none;
    `};
  padding: 0.5rem 1rem;
  border-bottom: 1px solid hsl(152, 14%, 89%);
  background-color: hsl(152, 17%, 98%);
`;
export const NumStageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
type StageDescribeProps = {
  isActive: boolean;
};
export const DescribeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StageDescribe = styled.h5<StageDescribeProps>`
  font-size: 0.8rem;
  line-height: 1;
  padding: 0;
  margin: 0.2rem 0 0;
  text-align: center;
  display: block;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.darklyGreen : "hsl(0,0%,80%)"};
  ${getTransition(300, "color", "ease-out")}
`;
type NumCircleProps = {
  status: "on" | "off" | "active";
};
export const NumCircle = styled.div<NumCircleProps>`
  position: relative;
  z-index: 2;
  text-align: center;
  border-radius: 50%;
  border: 2px solid
    ${({ theme, status }) =>
      status === "off" ? "hsl(0, 0%, 80%)" : theme.colors.darklyGreen};
  height: 27px;
  width: 27px;
  background-color: ${({ theme, status }) =>
    status === "active" ? theme.colors.brandGreen : "hsl(152, 17%, 98%)"};
  ${getTransition(300, ["background-color", "border-color"], "ease-out")}
`;
type NumberProps = NumCircleProps & {
  isFour?: boolean;
};
export const Number = styled.h5<NumberProps>`
  font-size: 1rem;
  margin: 0;
  ${({ isFour }) =>
    isFour &&
    css`
      margin-left: -0.1rem;
    `};
  padding: 0;
  font-weight: bold;
  line-height: 1.4;
  color: ${({ theme, status }) =>
    status === "active"
      ? theme.colors.revert
      : status === "on"
      ? theme.colors.darklyGreen
      : "hsl(0, 0%, 80%)"};
  ${getTransition(300, "color", "ease-out")}
`;
export const LineProgress = styled.div`
  position: absolute;
  bottom: auto;
  top: auto;
  left: 1rem;
  right: 1rem;
  z-index: 1;
  width: auto;
  height: 5px;
  background-color: hsl(0deg 0% 80%);
`;
type ProgressBarProps = {
  stage: number;
};
export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: calc(${({ stage }) => stage - 1} * 33%);
  background-color: ${({ theme }) => theme.colors.darklyGreen};
  ${getTransition(300, "width")};
`;
