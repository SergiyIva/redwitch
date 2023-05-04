import * as S from "./Styles";

type SpinnerProps = {
  isFullScreen?: boolean;
};
export const Spinner = ({ isFullScreen }: SpinnerProps) => {
  return (
    <S.Divider
      className={"container-center"}
      isFullScreen={isFullScreen}
      data-testid={"spinnerWrapper"}
      role="status"
      aria-label={"spinner"}
    >
      <div className="spinner-border text-success">
        <span className="visually-hidden">Loading...</span>
      </div>
    </S.Divider>
  );
};
