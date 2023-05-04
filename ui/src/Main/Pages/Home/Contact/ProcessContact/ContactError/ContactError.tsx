import * as S from "./Styles";
export const ContactError = () => {
  return (
    <div className="container pt-3">
      <S.Heading>Произошла ошибка</S.Heading>
      <S.Describe>Ошибка при сохранении контакта.</S.Describe>
      <S.Describe>Попробуйте повторить попытку позже.</S.Describe>
    </div>
  );
};
