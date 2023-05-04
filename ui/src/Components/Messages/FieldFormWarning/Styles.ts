import styled, { css } from "styled-components";

type WarningProps = {
  notAbsolute?: boolean;
  withoutStyle?: boolean;
};

export const Warning = styled.label<WarningProps>`
  ${({ notAbsolute }) =>
    notAbsolute
      ? css`
          margin-bottom: -0.25rem;
        `
      : css`
          position: absolute;
          bottom: -1.3rem;
        `};
  ${({ withoutStyle }) =>
    !withoutStyle &&
    css`
      text-align: center;
      font-size: 0.8rem;
    `};
`;
