import { NavLink } from "react-router-dom";
type ErrorMutationAdmin = {
  error: Error;
  tryAgain?: () => void;
};
export const ErrorMutationAdmin = ({ error, tryAgain }: ErrorMutationAdmin) => {
  return (
    <div className="container pt-3">
      <h1 className="alert-danger rounded-2 px-sm-1">Произошла ошибка</h1>
      <div>Произошла ошибка: {error.message}</div>
      {tryAgain && (
        <div>
          Повторить{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              tryAgain();
            }}
          >
            операцию
          </a>
        </div>
      )}
      <p>
        Операция завершилась с ошибкой на сервере. Проверьте правильность
        вводимых данных или попробуйте выполнить операцию еще раз позже.
      </p>
      <NavLink to="/admin/main">На главную</NavLink>
    </div>
  );
};
