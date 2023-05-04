import { CurveLine } from "../../../../Components/CurveLine/CurveLine";
import * as S from "./Styles";
import { slideContactVar } from "../../../../GraphQL/Cache";
//import { useScrollWindowListener } from "../../../../Hooks/useScrollWindowListener";

export const Hero = () => {
  //const [pageY] = useScrollWindowListener();
  return (
    <S.Section className="py-5 text-center container">
      <div className="row py-lg-5 ">
        <div
          className="col-lg-6 col-md-8 mx-auto hero-bg"
          style={
            {
              //translate: Math.floor(pageY / 2)
            }
          }
        >
          <h1 className="fw-light title-main">Добро пожаловать!</h1>
          <p className="lead describe-main">
            Мы готовы предоставить Вам наивысший уровень креатива и
            технологической новизны для решения любых поставленных задач.
            Индивидуальный подход, приятные цены, скорость и качество выполнения
            проектов - это основа нашей работы! Вы можете связаться с нами, либо
            узнать больше о нас. Ниже представлен ассортимент наших услуг.
          </p>
          <p>
            <button
              type={"button"}
              className="btn btn-success my-2 mx-1"
              onClick={() => slideContactVar(slideContactVar() + 1)}
            >
              Связаться с нами
            </button>

            <a href="/#about" className="btn btn-outline-success my-2 mx-1">
              О нас
            </a>
          </p>
        </div>
      </div>
      <CurveLine color={"rgb(248, 249, 250)"} />
    </S.Section>
  );
};
