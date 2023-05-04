import * as S from "./Styles";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import useWindowWidth from "../../../../../Hooks/useWindowWidth";
import { RowType } from "../../Orders";
import { TableRow } from "./TableRow/TableRow";
import { useSearchParams } from "react-router-dom";
import { TableContext } from "../../TableContext/TableContext";

export type SearchParamsType = {
  sort?: "asc" | "dsc";
  sortby?: keyof RowType;
  search?: string;
};

export const Table = () => {
  const { cols, rows } = useContext(TableContext);
  const width = useWindowWidth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [maxWidthId, setMaxWidthId] = useState(0);
  const sortingName =
    (searchParams.get("sortby") as keyof RowType) || "orderNumber";
  const isAscending = searchParams.get("sort") !== "dsc";
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>;

  const clickTh = (name: keyof RowType) => {
    const newSearchParams: SearchParamsType = {
      sortby: name
    };
    if (searchParams.get("search"))
      newSearchParams.search = searchParams.get("search")!;
    if (sortingName === name) {
      newSearchParams.sort = isAscending ? "dsc" : "asc";
      setSearchParams(newSearchParams);
    } else {
      newSearchParams.sort = "asc";
      setSearchParams(newSearchParams);
    }
  };

  useEffect(() => {
    if (tableRef && tableRef.current) {
      let totalWidth = tableRef.current.clientWidth - 120;
      let i = 0;
      for (const col of cols) {
        if (totalWidth <= 0) {
          setMaxWidthId(i > 0 ? i - 1 : i);
          break;
        } else {
          totalWidth -= col.width;
          i += 1;
        }
      }
    }
  }, [width]);
  return (
    <div className="row">
      <div className="col-sm-12" ref={tableRef}>
        <S.Table
          className="table table-hover table-striped dataTable dtr-inline collapsed"
          role="grid"
          aria-describedby="dt-basic-example_info"
        >
          <thead>
            <tr role="row">
              {cols.map((th, i) => {
                return (
                  <S.Th
                    key={th.name}
                    isOrder={i === 0}
                    isSorting={th.name === sortingName}
                    onClick={() => clickTh(th.name)}
                    tabIndex={0}
                    rowSpan={1}
                    colSpan={1}
                    $width={maxWidthId >= i ? th.width : 0}
                    role={"columnheader"}
                    aria-label={th.label}
                    data-testid={th.label + "test"}
                  >
                    {th.title}
                    <S.SortAsc
                      role={"figure"}
                      aria-label={"ascending arrow"}
                      isActive={isAscending && th.name === sortingName}
                    >
                      <FaLongArrowAltUp />
                    </S.SortAsc>
                    <S.SortDesc
                      role={"figure"}
                      aria-label={"descending arrow"}
                      isActive={!isAscending && th.name === sortingName}
                    >
                      <FaLongArrowAltDown />
                    </S.SortDesc>
                  </S.Th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, i) => (
                <TableRow
                  row={row}
                  isOdd={i % 2 === 0}
                  sortingName={sortingName}
                  maxWidthId={maxWidthId}
                  key={row.orderNumber}
                />
              ))
            ) : (
              <S.EmptyRow>
                <S.EmptyCell colSpan={maxWidthId + 1}>
                  По данному запросу данные не были найдены!
                </S.EmptyCell>
              </S.EmptyRow>
            )}
          </tbody>
          <tfoot>
            <tr>
              {cols.map((title, i) => (
                <S.FootTh
                  isFirst={i === 0}
                  isHidden={maxWidthId < i}
                  rowSpan={1}
                  colSpan={1}
                  key={title.name}
                >
                  {title.title}
                </S.FootTh>
              ))}
            </tr>
          </tfoot>
        </S.Table>
      </div>
    </div>
  );
};
