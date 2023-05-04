import styled, { css } from "styled-components";
import { navbarOpen } from "../../Styles/animations";

type HeaderProps = {
  isFixed: boolean;
};
export const Header = styled.nav<HeaderProps>`
  box-shadow: ${({ isFixed }) =>
    isFixed
      ? "0 0.275rem 1.25rem hsla(152, 39%, 7%, 0.05), 0 0.25rem 0.5625rem hsla(152, 39%, 7%, 0.03)"
      : "none"};
  background-color: hsl(152, 0%, 13%);
  position: ${({ isFixed }) => (isFixed ? "fixed" : "absolute")};
  top: 0;
  right: 0;
  left: 0;
  z-index: ${({ theme }) => theme.order.height};
  ${({ isFixed }) =>
    isFixed
      ? css`
          animation: ${navbarOpen} 0.25s ease-in-out;
        `
      : css`
          animation: "none";
        `};

  @media screen and ${({ theme }) => theme.media.PC} {
    padding-top: ${({ isFixed }) => (isFixed ? ".5rem" : "1.5rem")};
    background-color: ${({ isFixed }) =>
      isFixed ? "hsl(152, 0%, 13%);" : "transparent"};
  }
`;
export const BrandLink = styled.a`
  svg {
    vertical-align: -0.1em;
  }
`;
