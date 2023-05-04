import styled, { css } from "styled-components";
import { getTransition } from "../../../../../../Styles/utilites";
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 12.5rem;
  align-items: center;
  //input {
  //  padding: 0.7rem;
  //}
`;
type DividerProps = {
  isFirst: boolean;
};
export const FirstDivider = styled.div<DividerProps>`
  position: absolute;
  left: 0;
  right: 0;
  transform: translateX(${({ isFirst }) => (isFirst ? 0 : -150)}%);
  ${getTransition(300, "transform", "ease-out")}
`;

export const SecondDivider = styled.div<DividerProps>`
  position: absolute;
  left: 0;
  right: 0;
  transform: translateX(${({ isFirst }) => (isFirst ? 150 : 0)}%);
  ${getTransition(300, "transform", "ease-out")}
`;
export const Textarea = styled.textarea`
  height: 8.25em;
  max-height: 8.25em;
`;
export const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  margin-top: 2rem;
`;
export const ButtonBack = styled.div<DividerProps>`
  opacity: ${({ isFirst }) => (isFirst ? 0 : 1)};
  visibility: ${({ isFirst }) => (isFirst ? "hidden" : "visible")};
  ${getTransition(300, "opacity", "ease")}
`;

type CheckDividerProps = {
  isVisible: boolean;
  isTransDown: boolean;
};
export const CheckDivider = styled.div<CheckDividerProps>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  position: absolute;
  bottom: -2.5rem;
  margin-top: 1rem;
  ${({ isTransDown }) =>
    isTransDown &&
    css`
      transform: translateY(0.8em);
      @media screen and ${({ theme }) => theme.media.bigMobile} {
        transform: translateY(0.1em);
      }
      @media screen and ${({ theme }) => theme.media.iPad} {
        transform: translateY(0.8em);
      }
    `};

  ${getTransition(150, ["transform", "visibility", "opacity"], "ease")};
`;
export const InfoLabel = styled.label`
  font-size: 0.8rem;
  color: #6c757d;
  line-height: 1;
  text-align: left;
  margin-top: 1rem;
`;
export const CheckLabel = styled(InfoLabel)`
  color: ${({ theme }) => theme.colors.saturatlessGreen};
  margin-top: 0;
`;
