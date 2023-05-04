import { CellProps } from "../DefaultCell";
import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { DataCell } from "../../Styles";

type DateCellProps = CellProps & {
  name: "createdAt" | "updatedAt";
};
export const getLocalDate = (value: string) => {
  return new Date(value).toLocaleString();
};
export const DateCell = ({ isHidden, bgSpecial, name }: DateCellProps) => {
  const { row } = useContext(TableContext);
  const value = row![name];

  if (typeof isHidden === "boolean")
    return (
      <DataCell isHidden={isHidden} bgSpecial={bgSpecial}>
        {getLocalDate(value)}
      </DataCell>
    );
  return <span>{getLocalDate(value)}</span>;
};
