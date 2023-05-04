import styled, { css } from "styled-components";
import { getTransition } from "../../../Styles/utilites";

type TriggerProps = {
  isActive: boolean;
};
export const Trigger = styled.div<TriggerProps>`
  display: block;
  cursor: pointer;
  position: relative;
  z-index: ${({ theme }) => theme.order.three};
  width: 40px;
  height: 35px;
  ::after {
    content: "";
    position: absolute;

    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: 0.3s;
    border: 1px solid hsl(0, 0%, 43%);
    border-radius: 0.25rem;
  }
  span {
    top: 17px;
    width: 24px;
    left: 8px;
    display: block;
    height: 2px;
    position: absolute;
    background-color: #bbb;
    content: "";
    ${({ isActive }) =>
      isActive &&
      css`
        transform: rotate(45deg);
      `};
    transition: 0.3s;
    ::before {
      display: block;
      height: 2px;
      position: absolute;
      background-color: #bbb;
      content: "";
      transition: 0.3s;
      bottom: 6px;
      width: 24px;
      left: 0;
      ${({ isActive }) =>
        isActive &&
        css`
          bottom: 0;
          transform: rotate(-90deg);
        `};
    }
    ::after {
      top: 6px;
      width: 16px;
      left: 0;
      display: block;
      height: 2px;
      position: absolute;
      background-color: #bbb;
      content: "";
      transition: 0.3s;
      ${({ isActive }) =>
        isActive &&
        css`
          width: 0;
          transition: none;
        `};
    }
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    display: none;
  }
`;
type NavDividerProps = {
  isOpen: boolean;
  isShow: boolean;
};
export const NavDivider = styled.div<NavDividerProps>`
  @media screen and (max-width: 991px) {
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 3.5rem;
    right: 0;
    bottom: 0;
    width: 21em;
    z-index: ${({ theme }) => theme.order.height};
    max-width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.saturatlessGreen};
    border-left: 1px solid ${({ theme }) => theme.colors.saturatlessGreen};
    background-color: ${({ theme }) => theme.colors.bgColor};
    background-clip: padding-box;
    outline: 0;
    transform: ${({ isShow }) => (isShow ? "none" : "translateX(100%)")};
    visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
    transition: transform 0.3s ease-in-out;
  }
`;
type MenuProps = {
  isOpen: boolean;
};
export const Menu = styled.div<MenuProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border-bottom: 1px solid ${({ theme }) => theme.colors.saturatlessGreen};
  color: ${({ theme }) => theme.colors.revert};
  padding: calc(1.5rem * 0.75) 1.5rem;
  width: 100%;
`;
export const MenuHeader = styled.h5`
  margin: 0;
  font-weight: bold;
  letter-spacing: 0.015em;
`;
type NavLinkProps = {
  isSpecial?: boolean;
};
const linkStyles = css<NavLinkProps>`
  color: ${({ theme }) => theme.colors.font};
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  padding: 0;
  text-decoration: none;
  background-image: linear-gradient(
    to right,
    ${({ theme, isSpecial }) =>
      isSpecial ? theme.colors.orange : theme.colors.brandGreen},
    ${({ theme, isSpecial }) =>
        isSpecial ? theme.colors.orange : theme.colors.brandGreen}
      50%,
    ${({ theme }) => theme.colors.revert} 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  position: relative;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, background-position 0.3s ease-in-out;

  ::before {
    content: "";
    background: ${({ theme, isSpecial }) =>
      isSpecial ? theme.colors.orange : theme.colors.brandGreen};
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    transition: 0.3s ease-in-out;
  }

  :hover {
    background-position: 0;
    ::before {
      width: 100%;
    }
  }

  @media screen and ${({ theme }) => theme.media.PC} {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
`;
export const NavLink = styled.a<NavLinkProps>`
  ${linkStyles};
`;
export const NavBtn = styled.button<NavLinkProps>`
  border: none;
  text-transform: uppercase;
  ${linkStyles};
`;
export const ListElt = styled.li`
  margin-top: 1rem;
  @media screen and ${({ theme }) => theme.media.PC} {
    margin-top: 0;
    margin-right: 1rem;
  }
`;
export const ListContainer = styled.ul`
  padding: calc(1.5rem * 0.75) 1.5rem;
  align-self: flex-start;
  @media screen and ${({ theme }) => theme.media.PC} {
    margin-left: auto;
    margin-right: 5rem;
    align-self: auto;
    padding: 0;
  }
`;
type IconItemProps = {
  tag: "vk" | "inst" | "twit";
};
export const IconItem = styled.div<IconItemProps>`
  color: ${({ theme }) => theme.colors.revert};
  font-size: ${({ tag }) =>
    tag === "vk" ? "1.3rem" : tag === "inst" ? "1.1rem" : "1rem"};

  margin-right: 1rem;
  cursor: pointer;
  svg {
    vertical-align: -0.05em;
  }
  :hover {
    color: ${({ theme }) => theme.colors.brandGreen};
    transform: scale(1.4);
  }
  ${getTransition(300, ["color", "transform"], "ease-in-out")}
`;
export const IconContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 0.5rem 1.5rem;
  @media screen and ${({ theme }) => theme.media.PC} {
    align-self: auto;
    padding: 0;
    margin-top: 0;
  }
`;
type ContactProps = {
  isOpen: boolean;
};
export const Contact = styled.div<ContactProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border-top: 1px solid ${({ theme }) => theme.colors.saturatlessGreen};
  color: ${({ theme }) => theme.colors.revert};
  padding: calc(1.5rem * 0.75) 1.5rem;
  width: 100%;
  button {
    width: 100%;
  }
`;
