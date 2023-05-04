import { FilterInfo } from "./FilterInfo/FilterInfo";
import { Pagination } from "./Pagination/Pagination";

type FooterProps = {
  total: number;
  onPage: number;
  onPageFrom: number;
  onPageToMax: number;
  currentPage: number;
};
export const Footer = ({
  total,
  onPage,
  onPageFrom,
  onPageToMax,
  currentPage
}: FooterProps) => {
  return (
    <div className="row">
      <FilterInfo
        onPageFrom={onPageFrom}
        onPageToMax={onPageToMax}
        total={total}
      />
      <Pagination
        total={total}
        onPage={onPage}
        onPageToMax={onPageToMax}
        onPageFrom={onPageFrom}
        currentPage={currentPage}
      />
    </div>
  );
};
