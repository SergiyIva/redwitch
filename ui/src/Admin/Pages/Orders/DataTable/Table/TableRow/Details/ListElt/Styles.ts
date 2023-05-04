import styled from "styled-components";

export const Element = styled.li`
  padding: 0.5em 0;
  :first-child {
    padding-top: 0;
  }
  border-bottom: 1px solid hsl(0deg 0% 94%);
`;

export const TitleSpan = styled.span`
  display: inline-block;
  font-weight: bold;
  min-width: 100px;
`;
