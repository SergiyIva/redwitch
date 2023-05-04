import styled from "styled-components";
import { getTransition } from "../../../Styles/utilites";

export const ActionLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.saturatlessGreen};
  :focus,
  :hover {
    color: ${({ theme }) => theme.colors.brandGreen};
  }
  ${getTransition()}
`;

export const ParagraphRF = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  margin-top: 1.5rem;
`;
