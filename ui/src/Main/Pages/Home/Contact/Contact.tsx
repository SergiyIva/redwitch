import * as S from "./Styles";
import { CurveLine } from "../../../../Components/CurveLine/CurveLine";
import ProcessContact from "./ProcessContact/ProcessContact";
import { MutableRefObject, useRef } from "react";
import { useOnScreen } from "../../../../Hooks/useOnScreen";

export const Contact = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const animated = useOnScreen<HTMLDivElement>(ref, "-200px");
  return (
    <S.Section className="text-center container" id={"contact"}>
      <S.Divider $animated={animated} ref={ref}>
        <ProcessContact />
      </S.Divider>
      <CurveLine color={"hsl(152, 0%, 13%)"} />
    </S.Section>
  );
};
