import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Whoops404 } from "../Main/Pages/Whoops404/Whoops404";
import { lazy, useEffect } from "react";

export const Admin = () => {
  const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
  const AddCard = lazy(() => import("./Pages/AddCard/AddCard"));
  const EditCard = lazy(() => import("./Pages/EditCard/EditCard"));
  const Products = lazy(() => import("./Pages/Products/Products"));
  const Orders = lazy(() => import("./Pages/Orders/Orders"));
  const AllTime = lazy(() => import("./Pages/Statistic/AllTime/AllTime"));
  const Month = lazy(() => import("./Pages/Statistic/Month/Month"));
  const ThreeMonths = lazy(
    () => import("./Pages/Statistic/ThreeMonths/ThreeMonths")
  );
  const Year = lazy(() => import("./Pages/Statistic/Year/Year"));

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/")
      navigate("/admin/main");
  }, []);
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/main"} element={<Dashboard />} />
      <Route path={"/products"} element={<Products />} />
      <Route path={"/orders/"} element={<Orders />} />
      <Route path={"/orders/:onpage/:page"} element={<Orders />} />
      <Route path={"/add-card"} element={<AddCard />} />
      <Route path={"/edit-card/:sku"} element={<EditCard />} />
      <Route path={"/month"} element={<Month />} />
      <Route path={"/quarter"} element={<ThreeMonths />} />
      <Route path={"/year"} element={<Year />} />
      <Route path={"/all-time"} element={<AllTime />} />
      <Route path={"/*"} element={<Whoops404 />} />
    </Routes>
  );
};
