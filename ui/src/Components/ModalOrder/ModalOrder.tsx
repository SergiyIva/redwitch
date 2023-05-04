import { orderSKUVar } from "../../GraphQL/Cache";
import { useReactiveVar } from "@apollo/client";
import { Content } from "./Content/Content";
import * as S from "./Styles";

export const ModalOrder = () => {
  const sku = useReactiveVar(orderSKUVar);
  return (
    <div
      className="modal fade"
      id="staticBackdropLive"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLiveLabel"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <S.ModalDialog className="modal-dialog">
        {sku && <Content sku={sku} />}
      </S.ModalDialog>
    </div>
  );
};
