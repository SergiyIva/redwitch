import styled, { css } from "styled-components";
import { getTransition } from "../../../Styles/utilites";

type ModalBodyProps = {
  isOverflow: boolean;
};
export const ModalBody = styled.div<ModalBodyProps>`
  height: 270px;
  ${({ isOverflow }) =>
    isOverflow &&
    css`
      overflow-y: auto;
    `};
`;
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
export const Describe = styled.p`
  text-align: center;
  font-size: 1rem;
  color: hsl(152, 7%, 46%);
`;
