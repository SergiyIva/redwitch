import links from "../../LocalData/admin-links.json";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const { main, statistic } = links;
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {main.map(({ title, href }) => (
            <li className="nav-item" key={href}>
              <NavLink className={`nav-link main-link`} id={href} to={href}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Статистика</span>
          <NavLink
            className="link-secondary"
            to="#"
            aria-label="Add a new report"
          >
            <span data-feather="plus-circle">+</span>
          </NavLink>
        </h6>
        <ul className="nav flex-column mb-2">
          {statistic.map(({ href, title }) => (
            <li className="nav-item" key={href}>
              <NavLink className="nav-link main-link" to={href}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
