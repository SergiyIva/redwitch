import styled, { css } from "styled-components";
import { StatusVars } from "../../../../../../../../../../GraphQL/typeDefs";

export const Label = styled.label`
  :hover {
    background-color: hsla(152, 34%, 26%, 0.03);
  }
`;
type TitleProps = {
  status: StatusVars;
};
export const Title = styled.div<TitleProps>`
  ${({ status, theme }) => {
    const variants = {
      accepted: css`
        color: ${theme.colors.brandGreen};
      `,
      confirmed: css`
        color: ${theme.colors.lightBlue};
      `,
      inWork: css`
        color: ${theme.colors.lightOrange};
      `,
      done: css`
        color: ${theme.colors.darklyGreen};
      `,
      cancel: css`
        color: ${theme.colors.red};
      `
    };
    return variants[status];
  }};
`;
