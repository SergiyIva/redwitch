import { NavLink } from "react-router-dom";
import { Callorders } from "./Callorders/Callorders";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Панель управления</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            {/*<button type="button" class="btn btn-sm btn-outline-secondary"></button>*/}
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Экспорт
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
          >
            <span data-feather="calendar" />
            Этот месяц
          </button>
        </div>
      </div>
      <main>
        <h1>Начни управлять уже сейчас</h1>
        <p className="fs-5 col-md-8">
          Очень быстро и легко можно настроить данные для данного сайта. На
          панели управления имеется все необходимое, чтобы разместить
          информацию, принимать заказы и делать рассылки электронной почты.
        </p>

        <div className="mb-5">
          <NavLink
            to="/admin/add-card/"
            className="btn btn-success btn-lg px-4"
          >
            Добавить на витрину
          </NavLink>
        </div>

        <hr className="col-3 col-md-2 mb-5" />

        <div className="row">
          <div className="col-md-6">
            <h2>Обработка заказов и заявок</h2>
            <p>
              Выберите тип обращений пользователей, по которому хотите получить
              подробную информацию, а также возможность управления.
            </p>
            <ul className="icon-list">
              <li>
                <NavLink to={"/admin/orders"}>Все заказы</NavLink>
              </li>
              <li className="text-muted">Все заявки (coming soon!)</li>
            </ul>
          </div>

          <div className="col-md-6">
            <h2>Guides</h2>
            <p>
              Read more detailed instructions and documentation on using or
              contributing to Bootstrap.
            </p>
            <ul className="icon-list">
              <li>
                <a href="../getting-started/introduction/">
                  Bootstrap quick start guide
                </a>
              </li>
              <li>
                <a href="../getting-started/webpack/">
                  Bootstrap Webpack guide
                </a>
              </li>
              <li>
                <a href="../getting-started/parcel/">Bootstrap Parcel guide</a>
              </li>
              <li>
                <a href="../getting-started/contribute/">
                  Contributing to Bootstrap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Callorders />
    </>
  );
};

export default Dashboard;
