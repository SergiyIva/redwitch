import styled from "styled-components";

export const DataDivider = styled.div`
  padding: 0.85em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and ${({ theme }) => theme.media.iPad} {
    display: block;
  }
`;
