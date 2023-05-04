import * as S from "./Styles";

export type FilterInfoProps = {
  onPageFrom: number;
  onPageToMax: number;
  total: number;
};
export const FilterInfo = ({
  onPageFrom,
  onPageToMax,
  total
}: FilterInfoProps) => {
  return (
    <div className="col-sm-12 col-md-4">
      <S.DataDivider>
        Показано с {onPageFrom} по {onPageToMax < total ? onPageToMax : total}{" "}
        из {total} заказов
      </S.DataDivider>
    </div>
  );
};
