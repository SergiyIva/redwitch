import { NavLink } from "react-router-dom";
import { IS_LOGGED_IN } from "../../GraphQL/Query";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const logOut = () => {
    client.cache.evict({ fieldName: "me" });
    client.cache.gc();

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    client.cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false
      }
    });

    navigate("/");
  };
  return (
    <header className="navbar navbar-dark main-header sticky-top bg-dark">
      <button
        className="navbar-toggler d-md-none mx-3 collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
        data-testid={"navbarToggler"}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <NavLink
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
        to="/admin/main"
      >
        Администрирование
      </NavLink>

      {/*<input*/}
      {/*  className="form-control form-control-dark w-100"*/}
      {/*  type="text"*/}
      {/*  placeholder="Search"*/}
      {/*  aria-label="Search"*/}
      {/*/>*/}
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <a href={"#"} className="nav-link px-3" onClick={logOut}>
            Выйти
          </a>
        </div>
      </div>
    </header>
  );
};
