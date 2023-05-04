import { PropsWithChildren } from "react";
import { CurveLine } from "../../../../Components/CurveLine/CurveLine";
import * as S from "./Styles";

export const CardContainer = ({ children }: PropsWithChildren<any>) => {
  return (
    <S.Section className="album py-5 position-relative" id={"services"}>
      <div className="container ">{children}</div>
      <CurveLine color={"hsl(152, 90%, 18%)"} />
    </S.Section>
  );
};
