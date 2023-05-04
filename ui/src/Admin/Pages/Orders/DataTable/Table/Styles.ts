import styled, { css } from "styled-components";
import { DTCell } from "../../../../../Styles/utilites";

export const Table = styled.table`
  border: 1px solid hsl(0deg 0% 91%);
  border-collapse: separate;
  border-spacing: 0;

  > :not(caption) > * > * {
    box-shadow: none;
  }
`;
type ThProps = {
  isOrder?: boolean;
  isSorting: boolean;
  $width: number;
};
export const Th = styled.th<ThProps>`
  user-select: none;
  max-width: ${({ $width }) => $width}px;
  ${({ $width }) =>
    $width === 0 &&
    css`
      display: none;
    `};

  font-weight: 500;
  background-color: ${({ isSorting }) =>
    isSorting ? "hsla(152, 34%, 26%, .03)" : "inherit"};
  vertical-align: bottom;
  border: 1px solid #e9e9e9;
  ${({ isOrder }) =>
    !isOrder &&
    css`
      border-left-width: 0;
    `};

  border-bottom: 2px solid hsl(0deg 0% 91%);
  cursor: pointer;
  position: relative;
  padding: 0.5rem 35px 0.5rem 0.5rem;
`;
type SortIconProps = {
  isActive: boolean;
};
export const SortAsc = styled.div<SortIconProps>`
  right: 1rem;
  font-size: 0.85rem;
  position: absolute;
  bottom: 0.8em;
  display: block;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
`;

export const SortDesc = styled(SortAsc)`
  right: 0.5rem;
`;

export const EmptyRow = styled.tr`
  :hover {
    box-shadow: inset 1px 0 0 hsl(152, 9%, 87%),
      inset -1px 0 0 hsl(152, 9%, 87%), 0 1px 2px 0 hsla(210, 6%, 25%, 0.3),
      0 1px 3px 1px hsla(206, 6%, 25%, 0.15);
    z-index: 1;
  }
`;

export const EmptyCell = styled.td`
  padding: 1rem 2rem;
  position: relative;
  width: 100%;
  margin: 0;
  text-align: center;
  font-weight: bold;
  ${DTCell};
`;

type FootThProps = {
  isFirst?: boolean;
  isHidden: boolean;
};
export const FootTh = styled.th<FootThProps>`
  border: 1px solid hsl(0, 0%, 91%);
  ${({ isFirst }) =>
    !isFirst &&
    css`
      border-left-width: 0;
    `};

  font-weight: 500;
  ${({ isHidden }) =>
    isHidden &&
    css`
      display: none;
    `};
`;
