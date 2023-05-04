import styled, { css } from "styled-components";
import { DataCell } from "../../Styles";

type DividerProps = {
  isOpen: boolean;
};
export const Divider = styled(DataCell)<DividerProps>`
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  :before {
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 1rem;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.brandGreen};
    position: absolute;
    color: #fff;
    box-sizing: content-box;
    text-align: center;
    text-indent: 0;
    font-family: "Courier New", Courier, monospace;
    line-height: 14px;
    content: "+";
    ${({ isOpen }) =>
      isOpen &&
      css`
        content: "-";
        background-color: ${({ theme }) => theme.colors.orange};
      `};
  }
`;
