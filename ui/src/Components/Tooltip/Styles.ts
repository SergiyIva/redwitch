import styled, { css } from "styled-components";
import { opacityOn } from "../../Styles/animations";

import { Placement } from "@popperjs/core";

export const Wrapper = styled.div`
  display: inherit;
  position: relative;
`;

type TooltipProps = {
  direction: Placement;
  widthInRem?: number;
};
export const Tooltip = styled.div<TooltipProps>`
  font-size: 1rem;
  z-index: 10;
  position: absolute;
  display: block;
  ${({ direction }) =>
    direction.startsWith("left") || direction.startsWith("right")
      ? css`
          // margin: 0 0.2rem;
        `
      : css`
          // margin: 0.2rem 0;
        `};
  background-color: hsl(156, 0%, 26%);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
  line-height: 1.2;
  opacity: 0.9;
  min-width: ${({ widthInRem }) => (widthInRem ? widthInRem : 6)}rem;
  animation: ${opacityOn} 0.15s ease-in-out;
`;

export const FlexDivider = styled.div`
  display: flex;
`;

export const Heading = styled.h5`
  margin: 0;
  color: hsl(156, 0%, 88%);
  font-size: 0.9rem;
`;

export const Paragraph = styled.p`
  margin: 0;
  color: hsl(156, 0%, 75%);
`;
