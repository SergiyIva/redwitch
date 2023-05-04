import { NavLink } from "react-router-dom";

type SuccessMutationAdminProps = {
  goBack?: string;
  repeat?: () => void;
};
export const SuccessMutationAdmin = ({
  goBack,
  repeat
}: SuccessMutationAdminProps) => {
  return (
    <div className="container pt-3">
      <h1>Операция прошла успешно</h1>
      <p>
        Для выполнения еще одной операции{" "}
        {goBack && <NavLink to={goBack}>нажмите сюда</NavLink>}
        {repeat && (
          <a href={"#"} onClick={repeat} data-testid={"repeat"}>
            нажмите сюда
          </a>
        )}
      </p>
      <NavLink to="/admin/main">На главную</NavLink>
    </div>
  );
};
