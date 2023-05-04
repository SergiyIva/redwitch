import styled from "styled-components";

export const Heading = styled.h2`
  margin-bottom: 2rem;
  color: hsl(354, 70%, 54%);
`;
export const HeadingSuccess = styled(Heading)`
  color: ${({ theme }) => theme.colors.brandGreen};
`;
export const Describe = styled.p`
  color: ${({ theme }) => theme.colors.font};
`;
export const Wrapper = styled.div`
  text-align: center;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
