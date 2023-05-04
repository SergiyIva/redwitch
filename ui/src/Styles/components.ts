import styled, { css } from "styled-components";
import { getTransition } from "./utilites";
import { openModal } from "./animations";

export const FullOverDivider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const WindowClickListener = styled.div`
  z-index: ${({ theme }) => theme.order.two};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ErrorDivider = styled.div`
  margin: calc(var(--gap) + 5em) 4em;
  text-align: center;
  background-image: linear-gradient(
    -45deg,
    hsl(355, 80%, 80%),
    ${({ theme }) => theme.colors.red}
  );
  border: 2px solid hsla(${({ theme }) => theme.colors.darkRedValue}, 0.8);
  border-radius: 1rem;
  box-shadow: 0 0 6px 1px ${({ theme }) => theme.colors.lightRed};
  color: hsla(${({ theme }) => theme.colors.darkRedValue}, 0.8);
  padding: 1em;

  @media screen and ${({ theme }) => theme.media.bigMobile} {
    margin: calc(var(--gap) + 2em) 4em;
  }
`;

export const LikeLink = styled.span`
  color: ${({ theme }) => theme.colors.brandGreen};
  cursor: pointer;
  :hover {
    opacity: 0.66;
  }
`;

export const ColumnFlex = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  @media screen and ${({ theme }) => theme.media.bigMobile} {
    max-width: 620px;
  }

  @media screen and ${({ theme }) => theme.media.iPad} {
    max-width: 820px;
  }

  @media screen and ${({ theme }) => theme.media.PC} {
    max-width: 1000px;
  }

  @media screen and ${({ theme }) => theme.media.bigPC} {
    max-width: 1600px;
  }
`;

export const Row = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }
`;
type ListElementProps = {
  isJsxIn?: boolean;
};
export const ListElement = styled.li<ListElementProps>`
  ${({ isJsxIn }) =>
    isJsxIn &&
    css`
      display: flex;
    `};
  font-style: normal;
  color: ${({ theme }) => theme.colors.font};
  border-radius: 4px;
  align-items: center;
  justify-content: left;
  padding: 0.25rem 1rem;
  line-height: 1.2;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
  width: auto;
  ${getTransition(150, "background-color", "ease-in-out")}

  :focus,
  :hover {
    color: ${({ theme }) => theme.colors.brandGreen};
    background: ${({ theme }) => theme.colors.bgColor};
    opacity: 1;
  }
`;

export const HiddenParagraph = styled.p`
  color: transparent;
  margin: 0;
`;

export const ModalWrapper = styled(WindowClickListener)`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgColor};
  ${getTransition(150, "background-color")};
  overflow: hidden;
`;

type ModalProps = {
  isBig?: boolean;
};
export const Modal = styled.div<ModalProps>`
  cursor: initial;
  position: relative;
  ${({ isBig }) =>
    !isBig &&
    css`
      top: -5rem;
    `};

  width: 450px;
  animation: ${openModal} 0.3s ease-out;
`;

export const FullScreenModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.order.action};
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  animation: ${openModal} 0.3s ease-in;
`;

export const FullScreenModal = styled.div`
  width: 100vw;
  max-width: none;
  height: 100%;
  margin: 0;
  position: absolute;
  ${ColumnFlex};
  background-color: ${({ theme }) => theme.colors.bgColor};
`;
export const Content = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8);
  position: relative;
  ${ColumnFlex};
  width: 100%;
  pointer-events: auto;
  background-color: ${({ theme }) => theme.colors.revert};
  background-clip: padding-box;
  border: hsl(0, 0%, 64%) 1px solid;
  outline: 0;
  ${getTransition(150, ["background-color", "border-color"])};
`;
export const Close = styled.div`
  display: block;
  position: absolute;
  margin: 1rem;
  right: 0;
  z-index: ${({ theme }) => theme.order.two};
  color: ${({ theme }) => theme.colors.font};
  cursor: pointer;
  :hover {
    opacity: 0.66;
  }
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
type ModalTitleProps = {
  textAlign?: string;
};
export const ModalTitle = styled.h5<ModalTitleProps>`
  color: ${({ theme }) => theme.colors.font};
  margin: 0 2rem 1rem 0;
  ${({ textAlign }) =>
    textAlign &&
    css`
      margin-right: 0;
    `};
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.1;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "inherit")};
`;
type TextareaProps = {
  heightInRem: number;
};
export const Textarea = styled.textarea<TextareaProps>`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.revert};
  :focus-visible {
    outline: ${({ theme }) => theme.colors.brandGreen} inset 3px;
  }
  width: 100%;
  height: ${({ heightInRem }) => heightInRem}rem;
  resize: none;
`;
