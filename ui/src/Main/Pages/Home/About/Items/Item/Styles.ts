import styled, { css } from "styled-components";
import { slideToView } from "../../../../../../Styles/animations";
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
      animation-delay: ${$index * 75 + 100}ms;
      animation-fill-mode: backwards;
    `};
`;

export const Heading = styled.h2`
  color: hsl(145deg 80% 25%);
`;

export const IconDivider = styled.div`
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`;

export const Paragraph = styled.p`
  color: hsl(145, 17%, 20%);
`;
