import * as S from "./Styles";

type CurveLineProps = {
  color: string;
  bgColor?: string;
  isAbs?: boolean;
};

export const CurveLine = ({ color, bgColor, isAbs }: CurveLineProps) => {
  return (
    <S.Wrapper isAbs={isAbs} data-testid={"curvelineWrapper"}>
      <svg
        id="curveUpColor2"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1500 20"
        enableBackground="new 0 0 1500 20"
        xmlSpace="preserve"
        className={"curve-line"}
        style={{ backgroundColor: bgColor || "transparent" }}
        data-testid={"curveline"}
      >
        <path fill={color} stroke="#231F20" strokeMiterlimit="10" d="M0,20" />
        <path fill={color} d="M0,20C0,20,348,5,750,5s750,15,750,15H0z" />
      </svg>
    </S.Wrapper>
  );
};
