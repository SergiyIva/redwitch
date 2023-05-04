import styled from "styled-components";
import { DTCell } from "../../../../../../../Styles/utilites";

export const MainCell = styled.td`
  padding: 0;
  ${DTCell};
`;

export const ListWrapper = styled.ul`
  padding: 1rem 1rem 1.5rem 1.95rem;
  position: relative;
  width: 100%;
  margin: 0;
  list-style: none;
  ::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    background: ${({ theme }) => theme.colors.lightOrange};
  }
`;

export const ClipElt = styled.div`
  color: ${({ theme }) => theme.colors.lightOrange};
  width: 20px;
  height: 30px;
  position: absolute;
  top: -13px;
  right: 5px;
  font-size: 1.2rem;
`;

export const Element = styled.li`
  padding: 0.5em 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const IconContainer = styled.i`
  margin-right: 0.3em;
  font-size: 0.7rem;
  font-weight: 300;
`;
