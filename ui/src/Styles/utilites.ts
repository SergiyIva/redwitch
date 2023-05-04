import styled, { css } from "styled-components";
import { Property } from "csstype";

type PropertyLocal =
  | "color"
  | "background-color"
  | "opacity"
  | "visibility"
  | "border-color"
  | "border-radius"
  | "box-shadow"
  | "text-shadow"
  | "transform"
  | "outline"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "height"
  | "width"
  | "margin";
type Animation = Property.AnimationTimingFunction;

export const getTransition = (
  duration: number = 150,
  property: PropertyLocal[] | PropertyLocal = ["background-color", "color"],
  animation: Animation = "linear"
) => css`
  transition-property: ${Array.isArray(property)
    ? property.join(", ")
    : property};
  transition-duration: ${duration}ms;
  transition-timing-function: ${animation};
`;

export const ScreenReader = styled.label`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const visible = css`
  opacity: 1;
  visibility: visible;
`;

export const hidden = css`
  opacity: 0;
  visibility: hidden;
`;

export const ImagePlaceholder = css`
  font-size: 1.125rem;
  text-anchor: middle;
  user-select: none;
`;

export const fullHide = css`
  opacity: 0;
  visibility: hidden;
  display: none;
`;

export const DTCell = css`
  border: 1px solid hsl(0, 0%, 91%);
  border-bottom-width: 0;
  border-left-width: 0;
`;
