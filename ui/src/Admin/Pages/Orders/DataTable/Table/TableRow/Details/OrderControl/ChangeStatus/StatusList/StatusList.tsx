import { StatusVars } from "../../../../../../../../../../GraphQL/typeDefs";
import * as S from "./Styles";

export const dataStatuses = [
  {
    status: StatusVars.accepted,
    title: "Принят",
    describe: "Заказ обработан системой и ждет подтверждения."
  },
  {
    status: StatusVars.confirmed,
    title: "Подтвержден",
    describe: "Заказ подтвержден, в очереди на исполнение."
  },
  {
    status: StatusVars.inWork,
    title: "Выполняется",
    describe: "Заказ находится в работе."
  },
  {
    status: StatusVars.done,
    title: "Выполнен",
    describe: "Заказ полностью завершен, отдан заказчику."
  },
  {
    status: StatusVars.cancel,
    title: "Отменен",
    describe: "Заказ отменен."
  }
];

type OrderStatusListProps = {
  currStatus: StatusVars;
  setStatus: (arg: StatusVars) => void;
};

export const OrderStatusList = ({
  currStatus,
  setStatus
}: OrderStatusListProps) => {
  return (
    <div className={"list-group mx-0"}>
      {dataStatuses.map(({ status, title, describe }) => (
        <S.Label
          className="list-group-item d-flex gap-2"
          key={status}
          data-testid={"bgLabel" + status}
        >
          <input
            className="form-check-input flex-shrink-0"
            type="radio"
            name="listGroupRadios"
            id={status}
            value={status}
            onChange={() => setStatus(status)}
            checked={currStatus === status}
          />
          <span>
            {title}
            {currStatus === status && (
              <S.Title status={status}>
                <small className="d-block">{describe}</small>
              </S.Title>
            )}
          </span>
        </S.Label>
      ))}
    </div>
  );
};
