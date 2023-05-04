import styled from "styled-components";

export const SearchWrapper = styled.div`
  margin-bottom: 1rem;
  @media screen and ${({ theme }) => theme.media.iPad} {
    margin-bottom: 0;
  }
`;

export const SpanSearch = styled.span`
  svg {
    color: hsl(0, 0%, 25%);
  }
`;
