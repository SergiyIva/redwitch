import * as S from "./Styles";
import { MutableRefObject, useEffect, useRef } from "react";
import { useOnScreen } from "../../../../../Hooks/useOnScreen";
const uri = process.env.REACT_APP_URI;

type StepProps = {
  setStep: () => void;
  item: { src: string; title: string; subtitle: string; describe: string };
  i: number;
};
export const Step = ({ setStep, item, i }: StepProps) => {
  const ref = useRef() as MutableRefObject<HTMLLIElement>;
  const animated = useOnScreen<HTMLLIElement>(ref, "-200px");
  useEffect(() => {
    if (animated) setStep();
  }, [animated]);
  return (
    <S.Elt ref={ref}>
      <S.ImageContainer $animated={animated}>
        <img
          className="rounded-circle img-fluid"
          src={uri + item.src}
          alt={item.title}
        />
      </S.ImageContainer>
      <S.Panel isInvert={i % 2 != 0} $animated={animated}>
        <div>
          <S.Heading>{item.title}</S.Heading>
          <S.SubHeading>{item.subtitle}</S.SubHeading>
        </div>
        <div>
          <S.Paragraph>{item.describe}</S.Paragraph>
        </div>
      </S.Panel>
    </S.Elt>
  );
};
