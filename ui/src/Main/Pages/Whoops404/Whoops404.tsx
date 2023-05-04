import { useLocation } from "react-router-dom";

export const Whoops404 = () => {
  let location = useLocation();
  return (
    <div className={"container my-5"}>
      <div className="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center my-5">
        <h1 className="page-error color-fusion-500">
          ERROR <span className="text-gradient">404</span>
          <small className="fw-500 my-4">
            Cсылка <u>не действительна</u> в настоящее время.
          </small>
        </h1>
        <h5 className="fw-500 mb-4 color-fusion-500">
          У нас пока нет страницы по адресу {location.pathname}
        </h5>
        <p className={"color-fusion-500 paragraph-404"}>
          Если, по Вашем мнению, ссылка должна работать, то попробуйте
          перезагрузить страницу через пару минут. При отсутствии изменений -
          напишите нам на электронную почту:
          <br />
          <a type={"email"} href={"support@finevideo.ru"}>
            support@finevide.ru
          </a>
        </p>
      </div>
    </div>
  );
};
