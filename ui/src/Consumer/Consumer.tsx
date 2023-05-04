import { Header } from "../Main/Header/Header";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import { Spinner } from "../Components/Spinner/Spinner";
import Main from "../Main/Main";
import { Footer } from "../Main/Footer/Footer";
import { BackDrop } from "../Components/BackDrop/BackDrop";
import * as S from "./Styles";
import { ModalOrder } from "../Components/ModalOrder/ModalOrder";

const Consumer = () => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense
          fallback={
            <S.SpinnerDivider>
              <Spinner />
            </S.SpinnerDivider>
          }
        >
          <Main />
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <ModalOrder />
      <BackDrop />
    </>
  );
};

export default Consumer;
