import { Table } from "./Table/Table";
import { ColsType, RowsType } from "../Orders";
import { TableContext } from "../TableContext/TableContext";
import * as S from "./Styles";
import { useContext } from "react";

type DataTableProps = {
  cols: ColsType;
  rows: RowsType;
  nonFilterLength: number;
};
export const DataTable = ({ cols, rows, nonFilterLength }: DataTableProps) => {
  const ctx = useContext(TableContext);
  const value = { ...ctx, cols, rows };
  return (
    <TableContext.Provider value={value}>
      <div className="row">
        <div className="col-sm-12">
          <div
            id="dt-basic-example_wrapper"
            className="dataTables_wrapper dt-bootstrap4"
          >
            <Table />
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <S.FilterStrDivider
                  className="dataTables_info"
                  id="dt-basic-example_info"
                  role="status"
                  aria-live="polite"
                >
                  Показаны {rows.length} из {nonFilterLength} результатов
                </S.FilterStrDivider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
};
