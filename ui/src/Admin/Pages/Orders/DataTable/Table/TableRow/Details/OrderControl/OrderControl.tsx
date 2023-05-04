import * as S from "../Styles";
import { UpdateOrder } from "./UpdateOrder/UpdateOrder";
import { DeleteOrder } from "./DeleteOrder/DeleteOrder";
import { ChangeStatus } from "./ChangeStatus/ChangeStatus";

export const OrderControl = () => {
  return (
    <S.Element>
      <strong>Управление заказом</strong>
      <div className={"d-flex mt-2"}>
        <DeleteOrder />
        <ChangeStatus />
        <UpdateOrder />
      </div>
    </S.Element>
  );
};
