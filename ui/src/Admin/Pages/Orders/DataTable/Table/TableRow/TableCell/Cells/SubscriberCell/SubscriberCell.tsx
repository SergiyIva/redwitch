import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { CellProps } from "../DefaultCell";
import { DataCell } from "../../Styles";

export const SubscriberCell = ({ bgSpecial, isHidden }: CellProps) => {
  const { row } = useContext(TableContext);
  const value = row!.subscriber ? "Да" : "Нет";
  if (typeof isHidden === "boolean")
    return (
      <DataCell bgSpecial={bgSpecial} isHidden={isHidden}>
        {value}
      </DataCell>
    );
  return <span>{value}</span>;
};
