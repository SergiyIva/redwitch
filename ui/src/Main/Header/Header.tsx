import * as S from "./Styles";
import { useScrollWindowListener } from "../../Hooks/useScrollWindowListener";
import { FaFilm } from "react-icons/fa";
import { Navbar } from "./Navbar/Navbar";

export const Header = () => {
  const [pageY] = useScrollWindowListener();

  return (
    <>
      <S.Header
        className="navbar navbar-expand-lg navbar-dark"
        isFixed={pageY > 550}
      >
        <div className="container">
          <S.BrandLink className="navbar-brand" href="#">
            <FaFilm className={"me-2"} />
            Finevideo
          </S.BrandLink>
          <Navbar />
        </div>
      </S.Header>
    </>
  );
};
