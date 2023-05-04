import * as S from "./Styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChangeEvent } from "react";
import { OnPageType } from "../../../Orders";

export const selectValues: OnPageType[] = [10, 15, 25, 50, 100, -1];

export const Selector = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`/admin/orders/${Number(e.target.value)}/1${location.search}`);
  };
  return (
    <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-end">
      <S.SelectWrapper>
        <label htmlFor={"onPageSelect"}>Показать</label>
        <S.Select
          id={"onPageSelect"}
          name="dt-basic-example_length"
          aria-controls="dt-basic-example"
          className="form-control custom-select"
          onChange={onSelect}
          value={params.onpage || 10}
        >
          {selectValues.map((val) => (
            <option value={val} id={val.toString()} key={val}>
              {val === -1 ? "Все" : val}
            </option>
          ))}
        </S.Select>
        {params.onpage === "-1" ? "заказы" : "заказов"}
      </S.SelectWrapper>
    </div>
  );
};
