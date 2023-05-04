import styled from "styled-components";
import { getTransition } from "../../../../../Styles/utilites";

type WrapperProps = {
  isHidden: boolean;
};
export const Wrapper = styled.div<WrapperProps>`
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
`;
export const StateDivider = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
  opacity: ${({ isHidden }) => (isHidden ? "0" : "1")};
  ${getTransition(150, ["opacity", "visibility"], "ease")}
`;
export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;
export const Describe = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.saturatlessGreen};
`;
