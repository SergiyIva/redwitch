import { useReactiveVar } from "@apollo/client";
import { isBackDropVar } from "../../GraphQL/Cache";
import { useToggleVisible } from "../../Hooks/useToggleVisible";
import { useEffect } from "react";
import * as S from "./Styles";

export const BackDrop = () => {
  const isBackDrop = useReactiveVar(isBackDropVar);
  const [isOpen, isShow, toggle] = useToggleVisible(150);
  useEffect(() => {
    if (!isBackDrop && !isOpen) return;
    toggle();
  }, [isBackDrop]);
  if (isOpen)
    return (
      <S.Wrapper
        className={`modal-backdrop fade ${isShow && "show"}`}
        onClick={() => isBackDropVar(false)}
        data-testid={"backdrop"}
      />
    );
  return <></>;
};
