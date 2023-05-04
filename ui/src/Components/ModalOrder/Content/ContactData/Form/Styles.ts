import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: auto;
  align-items: center;
`;
type DividerProps = {
  isFirst: boolean;
};
export const FirstDivider = styled.div<DividerProps>`
  display: ${({ isFirst }) => (isFirst ? "block" : "none")};
`;

export const SecondDivider = styled.div<DividerProps>`
  display: ${({ isFirst }) => (isFirst ? "none" : "block")};
`;
export const Textarea = styled.textarea`
  height: 11.1em;
  width: 100%;
  resize: none;
`;

export const Describe = styled.p`
  text-align: center;
  color: hsl(152, 7%, 46%);
  margin-bottom: 0;
`;

export const CheckDivider = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
export const InfoLabel = styled.label`
  font-size: 0.8rem;
  color: hsl(152, 7%, 46%);
  line-height: 1;
  text-align: left;
  margin-top: 1rem;
`;
export const CheckLabel = styled(InfoLabel)`
  margin-top: 0.4rem;
  margin-left: 0.5rem;
`;
