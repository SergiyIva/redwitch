import styled, { css } from "styled-components";
import { growBubble, slideToViewText } from "../../../../../Styles/animations";

export const Elt = styled.li`
  position: relative;
  min-height: 50px;
  margin-bottom: 50px;

  ::before,
  ::after {
    display: table;
    content: " ";
  }
  ::after {
    clear: both;
  }

  @media screen and ${({ theme }) => theme.media.iPad} {
    min-height: 100px;
    margin-bottom: 100px;
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    min-height: 150px;
  }
`;
type ImageContainerProps = {
  $animated: boolean;
  isSpecial?: boolean;
};
export const ImageContainer = styled.div<ImageContainerProps>`
  position: absolute;
  z-index: 10;
  left: 0;
  width: 80px;
  height: 80px;
  margin-left: 0;
  text-align: center;
  color: white;
  border: 5px solid ${({ theme }) => theme.colors.saturatlessGreen};
  border-radius: 100%;
  background-color: ${({ isSpecial, theme }) =>
    isSpecial ? "hsl(25, 85%, 51%)" : theme.colors.saturatlessGreen};
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${growBubble} 0.75s linear;
      animation-fill-mode: backwards;
    `};

  @media screen and ${({ theme }) => theme.media.iPad} {
    left: 50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    border-width: 6px;
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    width: 150px;
    height: 150px;
    margin-left: -75px;
    border-width: 7px;
  }
`;

type PanelProps = {
  isInvert: boolean;
  $animated: boolean;
};
export const Panel = styled.div<PanelProps>`
  position: relative;
  float: right;
  width: 100%;
  padding: 0 20px 0 100px;
  text-align: left;
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${slideToViewText} 0.5s ease-out;
      animation-delay: 150ms;
      animation-fill-mode: backwards;
    `};
  @media screen and ${({ theme }) => theme.media.iPad} {
    float: left;
    width: 41%;
    padding: 0 20px 20px 30px;
    text-align: right;
    ${({ isInvert }) =>
      isInvert &&
      css`
        float: right;
        padding: 0 30px 20px 20px;
        text-align: left;
      `}
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    padding: 0 20px 20px;
  }
`;
export const Heading = styled.h4`
  color: hsl(152, 17%, 98%);
  font-weight: 700;
`;
export const Paragraph = styled.p`
  color: hsl(152, 30%, 87%);
`;
export const SubHeading = styled(Heading)`
  font-weight: 400;
`;
