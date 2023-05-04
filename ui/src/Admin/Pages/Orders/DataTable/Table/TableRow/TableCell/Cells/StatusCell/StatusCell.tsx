import { CellProps } from "../DefaultCell";
import { DataCell } from "../../Styles";
import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import * as S from "./Styles";
import { StatusVars } from "../../../../../../../../../GraphQL/typeDefs";

export const getStatus = (status: StatusVars) => {
  switch (status) {
    case "accepted":
      return "Принят";
    case "confirmed":
      return "Подтвержден";
    case "inWork":
      return "Выполняется";
    case "done":
      return "Выполнен";
    case "cancel":
      return "Отменен";
    default:
      return "Ошибка";
  }
};

export const StatusCell = ({ isHidden, bgSpecial }: CellProps) => {
  const { row } = useContext(TableContext);
  const getSpan = () => (
    <S.Span status={StatusVars[row!.status]}>{getStatus(row!.status)}</S.Span>
  );
  if (typeof isHidden === "boolean")
    return (
      <DataCell bgSpecial={bgSpecial} isHidden={isHidden}>
        {getSpan()}
      </DataCell>
    );
  else return <>{getSpan()}</>;
};
