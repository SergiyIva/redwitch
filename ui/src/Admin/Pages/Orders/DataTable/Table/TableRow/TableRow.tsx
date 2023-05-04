import { useContext } from "react";
import { RowType } from "../../../Orders";
import { TableContext } from "../../../TableContext/TableContext";
import { TableCell } from "./TableCell/TableCell";
import * as S from "./Styles";
import { useToggle } from "../../../../../../Hooks/useToggle";
import { Details } from "./Details/Details";

export type TableRowProps = {
  row: RowType;
  isOdd: boolean;
  sortingName: keyof RowType;
  maxWidthId: number;
};
export const TableRow = ({
  row,
  isOdd,
  sortingName,
  maxWidthId
}: TableRowProps) => {
  const [isOpen, toggleOpen] = useToggle();
  const table = useContext(TableContext);
  const value = { ...table, row, isOpen, toggleOpen: toggleOpen() };
  const cols = table.cols;

  const getBg = (name: keyof RowType) => {
    if (sortingName === name) {
      if (isOdd) {
        return "dark";
      } else return "light";
    }
  };

  return (
    <TableContext.Provider value={value}>
      <S.Row
        role="row"
        isOdd={isOdd}
        key={row.orderNumber}
        data-testid={"dataRow"}
      >
        {cols.map((col, i) => (
          <TableCell
            isHidden={maxWidthId < i}
            bgSpecial={getBg(col.name)}
            col={col}
            key={col.name}
          />
        ))}
      </S.Row>
      {isOpen && (
        <S.Row isOdd={false}>
          <Details
            colspan={maxWidthId + 1}
            tailCols={cols.slice(maxWidthId + 1)}
          />
        </S.Row>
      )}
    </TableContext.Provider>
  );
};
