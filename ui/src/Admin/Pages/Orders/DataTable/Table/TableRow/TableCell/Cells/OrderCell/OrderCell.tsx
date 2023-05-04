import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import * as S from "./Styles";
import { CellProps } from "../DefaultCell";

export const OrderCell = ({ bgSpecial, isHidden }: CellProps) => {
  const { row, isOpen, toggleOpen } = useContext(TableContext);
  const value = row!.orderNumber;
  return (
    <S.Divider
      isHidden={!!isHidden}
      bgSpecial={bgSpecial}
      isOpen={!!isOpen}
      onClick={toggleOpen!}
    >
      {value}
    </S.Divider>
  );
};
