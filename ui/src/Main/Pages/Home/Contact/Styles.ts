import styled, { css } from "styled-components";
import { slideToView } from "../../../../Styles/animations";

const uri = process.env.REACT_APP_URI;

export const Section = styled.section`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: none;
  background-color: hsl(0, 0%, 13%);
  box-shadow: inset -0.25rem 0 2rem 2rem hsl(0, 0%, 13%);
  background-image: url(${uri + "/img/1-noShadow.jpg"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;
type DividerProps = {
  $animated: boolean;
};
export const Divider = styled.div<DividerProps>`
  position: relative;
  margin: 3.5em 2em;
  padding: 1rem 0.5rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.revert};
  background-color: hsla(0, 0%, 0%, 0.5);
  box-shadow: 0 3px 5px 3px hsla(0, 0%, 0%, 0.25);
  overflow: hidden;
  min-width: 330px;
  height: auto;
  opacity: 0;
  visibility: hidden;
  ${({ $animated }) =>
    $animated &&
    css`
      visibility: visible;
      opacity: 1;
      animation: ${slideToView} 0.5s ease-out;
      animation-fill-mode: backwards;
    `};
  @media screen and ${({ theme }) => theme.media.iPad} {
    margin: 3.5em 2em 3.5em auto;
    max-width: 35vw;
  }
  @media screen and ${({ theme }) => theme.media.PC} {
    margin: 3.5em 5em 3.5em auto;
    max-width: 28vw;
  }
`;
