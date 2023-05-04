import { Suspense, useEffect } from "react";
import { Header } from "./Admin/Header/Header";
import { Admin } from "./Admin/Admin";
import { Sidebar } from "./Admin/Sidebar/Sidebar";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { Spinner } from "./Components/Spinner/Spinner";
import Auth from "./Admin/Auth/Auth";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN, IsUserLoggedIn } from "./GraphQL/Query";

const Administrator = () => {
  useEffect(() => {
    document.title = "Управление | Finevideo";
  }, []);
  const { data: log } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);

  if (!log?.isLoggedIn) return <Auth />;
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pb-3">
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Admin />
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </>
  );
};

export default Administrator;
