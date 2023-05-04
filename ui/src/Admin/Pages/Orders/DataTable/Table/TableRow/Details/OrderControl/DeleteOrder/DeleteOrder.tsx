import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";
import * as S from "../../Styles";
import { FaRegTrashAlt } from "react-icons/fa";
import { Modal } from "./Modal/Modal";

export const DeleteOrder = () => {
  const { row } = useContext(TableContext);
  return (
    <>
      <S.Button
        className={"btn btn-sm btn-outline-danger me-2"}
        data-bs-toggle="modal"
        type="button"
        data-bs-target={`#deleteModal${row?.orderNumber}`}
      >
        <S.IconContainer>
          <FaRegTrashAlt />
        </S.IconContainer>
        Удалить
      </S.Button>
      <Modal />
    </>
  );
};
