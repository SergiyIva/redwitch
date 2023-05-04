import styled, { css } from "styled-components";
import { slideToViewText } from "../../../../Styles/animations";
type HeadingProps = {
  $animated: boolean;
};
export const Heading = styled.h1<HeadingProps>`
  font-size: 2.5rem;
  text-align: center;
  font-weight: 600;
  color: hsl(145deg 80% 25%);
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${slideToViewText} 0.5s ease-out;
      animation-fill-mode: backwards;
    `};
`;
