import styled from "styled-components";

export const Heading = styled.h2`
  margin: -2rem 1rem 4rem;
  color: hsl(354, 70%, 54%);
`;
export const HeadingSuccess = styled(Heading)`
  color: ${({ theme }) => theme.colors.brandGreen};
`;
export const Describe = styled.p`
  color: ${({ theme }) => theme.colors.saturatlessGreen};
  margin-bottom: 2rem;
`;
