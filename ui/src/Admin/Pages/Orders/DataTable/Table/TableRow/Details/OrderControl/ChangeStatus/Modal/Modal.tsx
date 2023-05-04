import { MutableRefObject, useContext, useRef, useState } from "react";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { StatusVars } from "../../../../../../../../../../GraphQL/typeDefs";
import { useMutation } from "@apollo/client";
import {
  CHANGE_ORDER_STATUS,
  ChangeOrderStatusType
} from "../../../../../../../../../../GraphQL/Mutation";
import { ErrorMutationAdmin } from "../../../../../../../../../../Components/ErrorMutation/ErrorMutationAdmin";
import { Spinner } from "../../../../../../../../../../Components/Spinner/Spinner";
import { OrderStatusList } from "../StatusList/StatusList";

export const Modal = () => {
  const { row } = useContext(TableContext);
  const [status, setStatus] = useState<StatusVars>(row!.status);
  const [error, setError] = useState("");
  const closeBtn = useRef() as MutableRefObject<HTMLButtonElement>;
  const [change, { loading }] = useMutation<
    ChangeOrderStatusType["ChangeOrderStatus"],
    ChangeOrderStatusType["ChangeOrderStatusVars"]
  >(CHANGE_ORDER_STATUS, {
    variables: {
      id: row!._id,
      status
    },
    onCompleted: (data) => closeBtn.current.click(),
    onError: (err) => {
      setError(err.message);
      console.log(err);
    }
  });
  const onClick = async () => {
    await change();
  };
  return (
    <div
      className="modal fade"
      id={`changeModal${row?.orderNumber}`}
      tabIndex={-1}
      aria-labelledby="changeModal"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="changeModalLabel">
              Изменение статуса заказа
            </h5>
            <button
              ref={closeBtn}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          {error ? (
            <ErrorMutationAdmin
              error={new Error(error)}
              tryAgain={() => setError("")}
            />
          ) : loading ? (
            <Spinner />
          ) : (
            <div className="modal-body">
              <div className={"fw-bold mb-2"}>
                Выберите новый статус для заказа №{row!.orderNumber}:
              </div>
              <OrderStatusList currStatus={status} setStatus={setStatus} />
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              id="delBtn"
              type="button"
              className="btn btn-success"
              onClick={onClick}
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
