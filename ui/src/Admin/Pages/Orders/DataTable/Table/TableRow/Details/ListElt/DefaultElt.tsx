import { RowType } from "../../../../../Orders";
import { useContext } from "react";
import { TableContext } from "../../../../../TableContext/TableContext";

export const DefaultElt = ({ name }: { name: keyof RowType }) => {
  const { row } = useContext(TableContext);
  const value = row![name];
  return <span>{value}</span>;
};
