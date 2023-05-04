import * as S from "../ContactError/Styles";

export const ThankYou = () => {
  return (
    <div className="container pt-3 ">
      <S.HeadingSuccess>Благодарим за обращение</S.HeadingSuccess>
      <S.Describe>
        Ваша заявка принята, контакт будет рассмотрен администрацией в ближайшее
        время.
      </S.Describe>
      <a href="/#">Наверх</a>
    </div>
  );
};
