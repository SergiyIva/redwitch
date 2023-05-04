import styled from "styled-components";
import { getTransition } from "../../Styles/utilites";
import { ActionLink } from "./Contacts/Styles";

export const Footer = styled.footer`
    padding: 30px 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.saturatlessGreen};
    background: ${({ theme }) => theme.colors.bgColor};
}
`;
export const Heading = styled.h4`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.brandGreen};
  font-weight: 700;
  margin: 1.5rem 0;
`;
export const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

export const LinksContainer = styled.ul`
  list-style: none;
`;
export const Link = styled(ActionLink)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin-right: 0.2rem;

  ${getTransition(150, "color")};

  svg {
    margin-right: 0.5em;
    vertical-align: -0.1em;

    @media screen and ${({ theme }) => theme.media.PC} {
      vertical-align: -0.05em;
    }
  }
`;
