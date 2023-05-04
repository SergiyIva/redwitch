import styled, { css } from "styled-components";
import { getTransition } from "../../../../../../../../../Styles/utilites";
import { StatusVars } from "../../../../../../../../../GraphQL/typeDefs";

type SpanProps = {
  status: StatusVars;
};
export const Span = styled.span<SpanProps>`
  color: ${({ theme }) => theme.colors.revert};
  border-radius: 10rem;
  ${({ status, theme }) => {
    const variants = {
      accepted: css`
        background-color: ${theme.colors.brandGreen};
      `,
      confirmed: css`
        background-color: ${theme.colors.lightBlue};
      `,
      inWork: css`
        background-color: ${theme.colors.lightOrange};
      `,
      done: css`
        background-color: ${`hsla(${theme.colors.brandGreenValue}, 0.5)`};
      `,
      cancel: css`
        background-color: ${theme.colors.lightRed};
      `
    };
    return variants[status];
  }};
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 85%;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  ${getTransition(150)};
`;
