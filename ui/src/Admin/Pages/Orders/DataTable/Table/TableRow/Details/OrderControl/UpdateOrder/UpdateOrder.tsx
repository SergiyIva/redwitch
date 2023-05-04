import * as S from "../../Styles";
import { FaRegEdit } from "react-icons/fa";
import { Modal } from "./Modal/Modal";
import { useContext } from "react";
import { TableContext } from "../../../../../../TableContext/TableContext";

export const UpdateOrder = () => {
  const { row } = useContext(TableContext);
  return (
    <>
      <S.Button
        className={"btn btn-sm btn-outline-secondary"}
        data-bs-toggle="modal"
        type="button"
        data-bs-target={`#updateModal${row?.orderNumber}`}
      >
        <S.IconContainer>
          <FaRegEdit />
        </S.IconContainer>
        Изменить
      </S.Button>
      <Modal />
    </>
  );
};
