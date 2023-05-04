import * as S from "./Styles";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useInput } from "../../../../Hooks/useInput";
import { useMemo } from "react";
import { debounce } from "lodash";
import { SearchParamsType } from "../DataTable/Table/Table";

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [valueInput] = useInput(searchParams.get("search") || "");

  const setSearch = (value: string) => {
    const newSearchParams: SearchParamsType = {
      search: value
    };
    if (searchParams.get("sort"))
      newSearchParams.sort = searchParams.get(
        "sort"
      ) as SearchParamsType["sort"];
    if (searchParams.get("sortby"))
      newSearchParams.sortby = searchParams.get(
        "sortby"
      ) as SearchParamsType["sortby"];
    setSearchParams(newSearchParams);
  };

  const debouncedFn = useMemo(
    () =>
      debounce((v: string) => {
        setSearch(v);
      }, 1500),
    []
  );

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueInput.onChange(e);
    const v = e.target.value;
    debouncedFn(v);
  };

  return (
    <div className="row mb-3">
      <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-start">
        <div id="dt-basic-example_filter" className="dataTables_filter">
          <S.SearchWrapper className="input-group">
            <S.SpanSearch className="input-group-text">
              <FaSearch />
            </S.SpanSearch>
            <S.Search
              type="search"
              className="form-control"
              placeholder="Общий поиск"
              aria-label="Общий поиск"
              name="GLOBALSEARCH"
              value={valueInput.value}
              onChange={onType}
            />
          </S.SearchWrapper>
        </div>
      </div>
    </div>
  );
};
