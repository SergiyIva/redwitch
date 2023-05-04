import * as S from "../ContactError/Styles";
type ThankYouProps = {
  mail: string;
};
export const ThankYou = ({ mail }: ThankYouProps) => {
  return (
    <S.Wrapper>
      <S.HeadingSuccess>Благодарим за оформление</S.HeadingSuccess>
      <S.Describe>
        Ваша заявка принята и будет рассмотрена администрацией в ближайшее
        время.
      </S.Describe>
      <S.Describe>
        Вам на почту {mail} отправлено письмо с деталями заявки.
      </S.Describe>
    </S.Wrapper>
  );
};
