import React from "react";
import { ColsType, RowsType, RowType } from "../Orders";
import { GetOrdersType } from "../../../../GraphQL/Query";
type ContextType = {
  rows: RowsType;
  cols: ColsType;
  varsObj: GetOrdersType["GetOrdersVars"];
  row?: RowType;
  isOpen?: boolean;
  toggleOpen?: () => void;
};
export const TableContext = React.createContext<ContextType>({
  rows: [],
  cols: [],
  varsObj: {
    cursor: 0,
    sorting: {},
    filter: { onPage: 10 }
  }
});
