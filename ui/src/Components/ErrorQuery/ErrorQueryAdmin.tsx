import { NavLink } from "react-router-dom";

type ErrorQueryAdminProps = {
  error: Error;
  tryAgain?: () => void;
};
export const ErrorQueryAdmin = ({ error, tryAgain }: ErrorQueryAdminProps) => {
  return (
    <div className="container pt-3">
      <h1 className="alert-danger rounded-2 px-sm-1">Произошла ошибка</h1>
      <div>Произошла ошибка: {error.message}</div>
      {tryAgain && (
        <div>
          Повторный{" "}
          <a href="#" onClick={tryAgain}>
            запрос
          </a>
        </div>
      )}
      <p>Данные не были получены. Попробуйте выполнить запрос еще раз позже.</p>
      <NavLink to="/admin/main">На главную</NavLink>
    </div>
  );
};
