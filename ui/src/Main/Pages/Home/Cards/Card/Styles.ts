import styled, { css } from "styled-components";
import { slideToView } from "../../../../../Styles/animations";

type WrapperProps = {
  $index: number;
  $animated: boolean;
};
export const Wrapper = styled.div<WrapperProps>`
  visibility: hidden;
  ${({ $animated, $index }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${slideToView} 0.5s ease-out;
      animation-delay: ${$index * 50}ms;
      animation-fill-mode: backwards;
    `};
`;
