import { Items } from "./Items/Items";

import * as S from "./Styles";
import { CurveLine } from "../../../../Components/CurveLine/CurveLine";
import { MutableRefObject, useRef } from "react";
import { useOnScreen } from "../../../../Hooks/useOnScreen";

const About = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const animated = useOnScreen<HTMLDivElement>(ref, "-200px");
  return (
    <>
      <section className="py-5 position-relative" id="about">
        <div className={"container"} ref={ref}>
          <S.Heading className="pb-2" $animated={animated}>
            О Finevideo
          </S.Heading>
          <Items />
        </div>
        <CurveLine color={"hsl(0, 0%, 13%)"} />
      </section>
    </>
  );
};

export default About;
