import * as S from "./Styles";
export const ContactError = () => {
  return (
    <S.Wrapper>
      <S.Heading>Произошла ошибка</S.Heading>
      <S.Describe>Ошибка при сохранении данных заявки.</S.Describe>
      <S.Describe>Попробуйте повторить попытку позже.</S.Describe>
    </S.Wrapper>
  );
};
