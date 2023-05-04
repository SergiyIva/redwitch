import styled, { css } from "styled-components";
import { getTransition } from "../../Styles/utilites";
import { Direction, PopVariant } from "./NewPopover";

export const RelativeDivider = styled.div`
  position: relative;
  height: auto;
  width: auto;
  display: flex;
`;
type PopoverDividerProps = {
  variant: PopVariant;
  isShow: boolean;
  direction: Direction;
  minWidthInRem?: number;
};
export const PopoverDivider = styled.div<PopoverDividerProps>`
  position: absolute;
  ${({ direction }) =>
    direction === "top" &&
    css`
      // смещение относительно родительского эл-та
      top: -5px;
      left: 50%;
      // смещение относительно самого поповера
      transform: translate(-50%, -100%);
    `};
  ${({ direction }) =>
    direction === "bottom" &&
    css`
      top: 100%;
      left: 50%;
      transform: translate(-50%, 5px);
    `};
  ${({ direction }) =>
    direction === "right" &&
    css`
      top: 50%;
      left: 100%;
      transform: translate(5px, -50%);
    `};
  ${({ direction }) =>
    direction === "left" &&
    css`
      top: 50%;
      left: 0;
      transform: translate(calc(-100% - 10px), -50%);
    `};
  z-index: 1000;
  display: block;
  max-width: ${({ variant }) => (variant === "large" ? "260px" : "116px")};
  ${({ minWidthInRem }) =>
    minWidthInRem &&
    css`
      min-width: ${minWidthInRem}rem;
    `};
  font-weight: 400;
  line-height: ${({ variant }) => (variant === "large" ? 1.5 : 1)};
  text-align: ${({ direction }) =>
    direction === ("top" || "bottom") ? "center" : "start"};
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  font-size: 0.875rem;
  word-wrap: break-word;
  background-color: hsl(156, 0%, 26%);
  background-clip: padding-box;
  border: 1px solid hsl(156, 0%, 64%);
  border-radius: 0.3rem;
  ${getTransition(150, ["opacity", "top"])}
  ${({ isShow }) =>
    isShow
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;
type ArrowProps = {
  direction: Direction;
  variant: PopVariant;
};

export const Arrow = styled.div<ArrowProps>`
  position: absolute;
  display: block;
  ::after,
  ::before {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;
  }

  ${({ direction, variant, theme }) => {
    switch (direction) {
      case "top":
        return css`
          left: 50%;
          width: 1rem;
          height: 0.5rem;
          bottom: 0;
          transform: translate(-50%, calc(100%));
          ::after,
          ::before {
            border-width: 0.5rem 0.5rem 0;
          }
          ::before {
            bottom: 0;
            border-top-color: hsl(156, 0%, 64%);
          }
          ::after {
            bottom: 1px;
            border-top-color: hsl(156, 0%, 26%);
          }
        `;
      case "right":
        return css`
          top: 50%;
          width: 0.5rem;
          height: 1rem;
          left: 0;
          transform: translate(-100%, -50%);
          ::after,
          ::before {
            border-width: 0.5rem 0.5rem 0.5rem 0;
          }
          ::before {
            left: 0;
            border-right-color: hsl(156, 0%, 64%);
          }
          ::after {
            left: 1px;
            border-right-color: hsl(156, 0%, 26%);
          }
        `;
      case "bottom":
        return css`
          left: 50%;
          width: 1rem;
          height: 0.5rem;
          top: 0;
          transform: translate(-50%, calc(-100%));
          ::after,
          ::before {
            border-width: 0 0.5rem 0.5rem 0.5rem;
          }
          ::before {
            top: 0;
            border-bottom-color: hsl(156, 0%, 64%);
          }
          ::after {
            top: 1px;
            border-bottom-color: hsl(156, 0%, 26%);
          }
        `;
      case "left":
        return css`
          top: 50%;
          width: 0.5rem;
          height: 1rem;
          right: 0;
          transform: translate(100%, -50%);
          ::after,
          ::before {
            border-width: 0.5rem 0 0.5rem 0.5rem;
          }
          ::before {
            right: 0;
            border-left-color: hsl(156, 0%, 64%);
          }
          ::after {
            right: 1px;
            border-left-color: hsl(156, 0%, 26%);
          }
        `;
    }
  }};
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: hsl(156, 0%, 26%);
  border-bottom: 1px solid hsla(156, 0%, 26%, 0.1);
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);

  svg {
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin-right: -0.2rem;
  }
  svg:hover {
    opacity: 0.66;
  }
`;

export const Header = styled.header`
  flex: 3 0 50%;
  font-size: 1rem;
  margin-bottom: 0;
`;

type BodyProps = {
  variant: PopVariant;
};
export const Body = styled.div<BodyProps>`
  ${({ variant }) => css`
    padding: ${variant === "small" ? "0.5rem" : "1rem"};
  `};
  color: white;
  text-align: center;
  font-size: 1rem;
`;
