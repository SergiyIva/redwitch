import styled, { css } from "styled-components";
import { slideToViewText } from "../../../../Styles/animations";
import { getTransition } from "../../../../Styles/utilites";

export const Section = styled.section`
  background: linear-gradient(
    0,
    hsl(145, 80%, 25%) 0,
    hsl(152, 90%, 18%) 95%,
    hsl(152, 90%, 18%) 100%
  );
`;
type SectionProps = {
  $animated: boolean;
};
export const MainHeading = styled.h2<SectionProps>`
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 700;
  color: hsl(152, 17%, 98%);
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${slideToViewText} 0.5s ease-out;
      animation-fill-mode: backwards;
    `};
`;
export const SubMainHeading = styled.h3<SectionProps>`
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 4rem;
  color: hsl(152, 30%, 87%);
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      animation: ${slideToViewText} 0.5s ease-out;
      animation-fill-mode: backwards;
    `};
`;
type TimelineProps = {
  multBy: number;
};
export const Timeline = styled.ul<TimelineProps>`
  position: relative;
  padding: 0;
  list-style: none;

  ::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40px;
    width: 2px;
    margin-left: -1.5px;
    content: "";
    height: ${({ multBy }) => multBy * 25}%;
    //hsl(152, 34%, 40%);
    background-color: ${({ theme }) => theme.colors.saturatlessGreen};
    ${getTransition(500, "height")};

    @media screen and ${({ theme }) => theme.media.iPad} {
      left: 50%;
    }
  }
`;

export const SpecialHeading = styled.h4`
  font-size: 10px;
  line-height: 14px;
  margin-top: 12px;
  font-weight: 700;
  color: hsl(152, 17%, 98%);

  @media screen and ${({ theme }) => theme.media.iPad} {
    font-size: 13px;
    line-height: 18px;
    margin-top: 16px;
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    font-size: 18px;
    line-height: 26px;
    margin-top: 30px;
  }
`;
