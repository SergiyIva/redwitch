import * as S from "../../Styles";
import { FaRegBell } from "react-icons/fa";
import { Modal } from "./Modal/Modal";
import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";

export const ChangeStatus = () => {
  const { row } = useContext(TableContext);
  return (
    <>
      <S.Button
        className={"btn btn-sm btn-outline-success me-2"}
        data-bs-toggle="modal"
        type="button"
        data-bs-target={`#changeModal${row?.orderNumber}`}
      >
        <S.IconContainer>
          <FaRegBell />
        </S.IconContainer>
        Сменить статус
      </S.Button>
      <Modal />
    </>
  );
};
