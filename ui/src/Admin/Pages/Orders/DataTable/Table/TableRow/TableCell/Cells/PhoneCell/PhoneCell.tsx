import { DataCell } from "../../Styles";
import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import { CellProps } from "../DefaultCell";

export const PhoneCell = ({ bgSpecial, isHidden }: CellProps) => {
  const { row } = useContext(TableContext);
  const getValue = () => {
    const phone = row!.phone;
    return `8(${phone.slice(0, 3)})${phone.slice(3, 6)}-${phone.slice(
      6,
      8
    )}-${phone.slice(8, 10)}`;
  };
  if (typeof isHidden === "boolean")
    return (
      <DataCell bgSpecial={bgSpecial} isHidden={isHidden}>
        {getValue()}
      </DataCell>
    );
  return <span> {getValue()}</span>;
};
