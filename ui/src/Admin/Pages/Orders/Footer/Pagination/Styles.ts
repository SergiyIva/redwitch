import styled from "styled-components";

export const PaginatorDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and ${({ theme }) => theme.media.iPad} {
    display: block;
  }
`;

export const UlContainer = styled.ul`
  justify-content: center;
  @media screen and ${({ theme }) => theme.media.iPad} {
    justify-content: flex-end;
  }
`;
