import * as S from "./Styles";
import Home from "./Pages/Home/Home";

const Main = () => {
  // const Home = lazy(() => import("./Pages/Home/Home"));

  return (
    <S.Main>
      {/*<Routes>*/}
      {/*  <Route path={"/"} element={<Home />} />*/}
      {/*</Routes>*/}
      <Home />
    </S.Main>
  );
};

export default Main;
