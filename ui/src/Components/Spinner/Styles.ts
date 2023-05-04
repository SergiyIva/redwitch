import styled from "styled-components";
type DividerProps = {
  isFullScreen?: boolean;
};
export const Divider = styled.div<DividerProps>`
  height: ${({ isFullScreen }) => (isFullScreen ? "70vh" : "200px")};
  flex-wrap: wrap;
`;
