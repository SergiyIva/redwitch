import styled from "styled-components";

export const ModalDialog = styled.div`
  margin: 5rem 0.5rem;
  @media screen and ${({ theme }) => theme.media.bigMobile} {
    margin: 5rem auto;
  }
`;
