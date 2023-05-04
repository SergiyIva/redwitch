import styled, { css } from "styled-components";
type WrapperProps = {
  isAbs?: boolean;
};
export const Wrapper = styled.div<WrapperProps>`
  ${({ isAbs }) =>
    isAbs &&
    css`
      position: relative;
      bottom: -7px;
    `};
`;
