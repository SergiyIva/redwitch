import { useContext } from "react";
import { RowType } from "../../../../../Orders";
import { TableContext } from "../../../../../TableContext/TableContext";
import * as S from "../Styles";

export type CellProps = {
  isHidden?: boolean;
  bgSpecial?: "dark" | "light";
};
type DefaultCellProps = {
  name: keyof RowType;
  isHidden: boolean;
  bgSpecial?: "dark" | "light";
};

export const DefaultCell = ({
  name,
  bgSpecial,
  isHidden
}: DefaultCellProps) => {
  const { row } = useContext(TableContext);
  const value = row![name];
  return (
    <S.DataCell isHidden={isHidden} bgSpecial={bgSpecial}>
      {value}
    </S.DataCell>
  );
};
