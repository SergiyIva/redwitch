import { CurveLine } from "../../../../Components/CurveLine/CurveLine";
import data from "../../../../LocalData/project-steps.json";
import * as S from "./Styles";
import { Elt, ImageContainer } from "./Step/Styles";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useOnScreen } from "../../../../Hooks/useOnScreen";
import { Step } from "./Step/Step";

export const ProjectSteps = () => {
  const [step, setStep] = useState(0);
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const specRef = useRef() as MutableRefObject<HTMLLIElement>;
  const animated = useOnScreen<HTMLDivElement>(ref, "-200px");
  const specialAnimated = useOnScreen<HTMLLIElement>(specRef, "-200px");
  useEffect(() => {
    if (specialAnimated) setStep(4);
  }, [specialAnimated]);
  return (
    <S.Section
      className="py-5 green-bg position-relative"
      id="project"
      ref={ref}
    >
      <div className="container">
        <div className="text-center">
          <S.MainHeading className="text-uppercase" $animated={animated}>
            Этапы проекта
          </S.MainHeading>
          <S.SubMainHeading $animated={animated}>
            Наглядная демонстрация шагов по реализации проекта.
          </S.SubMainHeading>
        </div>
        <S.Timeline multBy={step}>
          {data.map((item, i) => (
            <Step
              item={item}
              i={i}
              key={item.title}
              setStep={() => {
                if (i > step) setStep(i);
              }}
            />
          ))}
          <Elt ref={specRef}>
            <ImageContainer isSpecial={true} $animated={specialAnimated}>
              <S.SpecialHeading>
                Только
                <br />
                позитивные
                <br />
                эмоции!
              </S.SpecialHeading>
            </ImageContainer>
          </Elt>
        </S.Timeline>
      </div>
      <CurveLine color={"#fff"} />
      {/*<CurveLine color={"hsl(0, 0%, 13%)"} isAbs={true} />*/}
    </S.Section>
  );
};
