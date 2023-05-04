import styled from "styled-components";

type RowProps = {
  isOdd: boolean;
};
export const Row = styled.tr<RowProps>`
  background-color: ${({ isOdd }) =>
    isOdd ? "hsla(152, 34%, 26%, .02)" : "initial"};

  :hover {
    box-shadow: inset 1px 0 0 hsl(152, 9%, 87%),
      inset -1px 0 0 hsl(152, 9%, 87%), 0 1px 2px 0 hsla(210, 6%, 25%, 0.3),
      0 1px 3px 1px hsla(206, 6%, 25%, 0.15);
    z-index: 1;
  }
`;
