import styled, { css } from "styled-components";
import { DTCell } from "../../../../../../../Styles/utilites";

export type DataCellProps = {
  isHidden: boolean;
  bgSpecial?: "dark" | "light";
};
export const DataCell = styled.td<DataCellProps>`
  ${({ isHidden }) =>
    isHidden &&
    css`
      display: none;
    `};
  ${({ bgSpecial }) =>
    bgSpecial &&
    css`
      background-color: ${bgSpecial === "dark"
        ? "hsla(152, 34%, 26%, .04)"
        : "hsla(152, 34%, 26%, .02)"};
    `};
  ${DTCell};
`;
