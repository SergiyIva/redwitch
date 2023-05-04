import * as C from "../Styles";
import * as S from "./Styles";

export const Contacts = () => {
  return (
    <div className="col-lg-3">
      <C.Heading>Наши контакты</C.Heading>
      <address className="mb-lg-4 mb-0">
        <strong>Finevideo, Inc.</strong>
        <br />
        г. Тверь, Тверская обл.
        <br />
        ул. Горького, д. 140
        <br />
        <br />
        <strong>Телефон:</strong>
        <br />
        8-999-005-1551
        <br />
        8-915-120-3578
        <br />
        <strong>Email:</strong>
        <br />
        <S.ActionLink href="mailto:support@finevideo.ru">
          support@finevideo.ru
        </S.ActionLink>
        <br />
        <S.ParagraphRF>Работаем по всей РФ</S.ParagraphRF>
      </address>
    </div>
  );
};
