import { DefaultCell } from "./Cells/DefaultCell";
import { ColType } from "../../../../Orders";

type TableCellProps = {
  col: ColType;
  isHidden: boolean;
  bgSpecial?: "dark" | "light";
};
export const TableCell = ({ col, bgSpecial, isHidden }: TableCellProps) => {
  const Component = col.Cell || DefaultCell;
  return (
    <Component name={col.name} isHidden={isHidden} bgSpecial={bgSpecial} />
  );
};
