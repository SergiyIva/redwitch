import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SERVICE_CARDS, GetServiceCardsType } from "../../../GraphQL/Query";
import { useEffect, useState } from "react";
import { Spinner } from "../../../Components/Spinner/Spinner";
import { _GET_SERVICE_CARDS } from "../../../GraphQL/TestQuery";
import { TitleAdmin } from "../../../Components/TitleAdmin/TitleAdmin";

const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARDS : GET_SERVICE_CARDS;

const Products = () => {
  const { data, error, loading } = useQuery<
    GetServiceCardsType["GetServiceCards"],
    GetServiceCardsType["GetServiceCardsVars"]
  >(query, {
    variables: {
      isAll: true
    }
  });
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  const onChangeClick = () => {
    if (!!error || !data!.getCards.length) return;
    navigate("/admin/edit-card/" + value);
  };

  useEffect(() => {
    if (data && data.getCards.length) setValue(data.getCards[0].sku);
  }, [data]);
  if (loading) return <Spinner isFullScreen={true} />;
  return (
    <>
      <TitleAdmin>Витрина</TitleAdmin>
      <main className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col mb-3">
          <div className="card">
            <div className="card-header">Добавить новую услугу</div>
            <div className="card-body">
              <h5 className="card-title">Новая услуга</h5>
              <p className="card-text">
                Добавить новую услугу на главную страницу, с добавлением всей
                необходимой информацией.
              </p>
              <NavLink to="/admin/add-card" className="btn btn-success">
                Добавить
              </NavLink>
            </div>
            <div className="card-footer text-muted">Последнее добавление</div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header">Обновить данные услуг</div>
            <div className="card-body">
              <h5 className="card-title">Изменение услуг</h5>
              <p className="card-text">
                Изменить или удалить услугу. Также можно скрыть отображение без
                удаления из базы данных.
              </p>
              <div className="mb-3">
                <label htmlFor="select" className="form-label">
                  Выбрать услугу
                </label>
                <select
                  id="select"
                  className={`form-select`}
                  disabled={!!error || !data!.getCards.length}
                  value={value}
                  onChange={onChange}
                >
                  {data && data.getCards.length ? (
                    data.getCards.map(({ sku, name }) => (
                      <option value={sku} key={sku}>
                        {name}
                      </option>
                    ))
                  ) : (
                    <option id={"nodataError"}>
                      {error ? error.message : "Данные отсутствуют"}
                    </option>
                  )}
                </select>
              </div>
              <button
                id="selectBtn"
                onClick={onChangeClick}
                className="btn btn-success"
              >
                Изменить
              </button>
            </div>
            <div className="card-footer text-muted">Последнее изменение</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
