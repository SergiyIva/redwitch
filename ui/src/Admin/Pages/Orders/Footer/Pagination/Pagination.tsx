import * as S from "./Styles";
import { NavLink, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { range } from "lodash";
import { useMemo } from "react";

export type PaginationProps = {
  total: number;
  onPage: number;
  onPageToMax: number;
  onPageFrom: number;
  currentPage: number;
};

export const Pagination = ({
  currentPage,
  onPageFrom,
  onPageToMax,
  total,
  onPage
}: PaginationProps) => {
  const location = useLocation();
  const maxPage = useMemo(() => {
    const res = Math.ceil(total / (onPageToMax - onPageFrom + 1));
    return res;
  }, [total, onPageFrom, onPageToMax]);

  const getStart = () => {
    if (currentPage - 2 < 2 || maxPage - 5 < 2) {
      return 2;
    } else {
      if (currentPage + 3 > maxPage) {
        return maxPage - 5;
      }
      return currentPage - 2;
    }
  };

  const getTo = (page: number) =>
    `/admin/orders/${onPage}/${page}` + location.search;

  return (
    <div className="col-sm-12 col-md-8">
      <S.PaginatorDivider>
        <S.UlContainer className="pagination">
          <li
            className={`paginate_button page-item previous ${
              currentPage === 1 ? "disabled" : ""
            }`}
            id="dt-basic-example_previous"
            data-testid={"prevPageElt"}
          >
            <NavLink
              to={getTo(currentPage - 1)}
              aria-controls="dt-basic-example"
              data-dt-idx="0"
              tabIndex={1}
              className="page-link"
              aria-label={"Previous page"}
            >
              <i className="fal">
                <FaChevronLeft />
              </i>
            </NavLink>
          </li>
          <li
            className={`paginate_button page-item ${
              currentPage === 1 ? "active" : ""
            }`}
            data-testid={"1pageElt"}
          >
            <NavLink
              to={getTo(1)}
              aria-controls="dt-basic-example"
              data-dt-idx="1"
              tabIndex={1}
              className="page-link"
              aria-label={"first page"}
            >
              1
            </NavLink>
          </li>
          {maxPage !== 1 &&
            range(
              getStart(),
              Math.min(maxPage, currentPage + 3 < 7 ? 7 : currentPage + 4)
            ).map((i) =>
              (maxPage > 7 && currentPage + 3 < 7 && i === 6) ||
              (currentPage + 3 >= 7 && i === currentPage + 3) ? (
                <li
                  className="paginate_button page-item disabled"
                  id="dt-basic-example_ellipsis"
                  key={"..."}
                  data-testid={"midPageElt"}
                >
                  <NavLink
                    to={getTo(currentPage)}
                    aria-controls="dt-basic-example"
                    data-dt-idx="6"
                    tabIndex={1}
                    className="page-link"
                  >
                    …
                  </NavLink>
                </li>
              ) : (
                <li
                  className={`paginate_button page-item ${
                    currentPage === i ? "active" : ""
                  }`}
                  key={i}
                  data-testid={`${i}pageElt`}
                >
                  <NavLink
                    to={getTo(i)}
                    aria-controls="dt-basic-example"
                    data-dt-idx={i}
                    tabIndex={1}
                    className="page-link"
                    aria-label={`${i} page`}
                  >
                    {i}
                  </NavLink>
                </li>
              )
            )}
          {maxPage !== 1 && (
            <li
              className={`paginate_button page-item ${
                currentPage === maxPage ? "active" : ""
              }`}
              data-testid={`${maxPage}pageElt`}
            >
              <NavLink
                to={getTo(maxPage)}
                aria-controls="dt-basic-example"
                data-dt-idx="7"
                tabIndex={1}
                className="page-link"
                aria-label={`${maxPage} page`}
              >
                {maxPage}
              </NavLink>
            </li>
          )}
          <li
            className={`paginate_button page-item next ${
              currentPage === maxPage ? "disabled" : ""
            }`}
            id="dt-basic-example_next"
            data-testid={"nextPageElt"}
          >
            <NavLink
              to={getTo(currentPage + 1)}
              aria-controls="dt-basic-example"
              data-dt-idx="8"
              tabIndex={1}
              className="page-link"
              aria-label={"Next page"}
            >
              <i className="fal">
                <FaChevronRight />
              </i>
            </NavLink>
          </li>
        </S.UlContainer>
      </S.PaginatorDivider>
    </div>
  );
};
