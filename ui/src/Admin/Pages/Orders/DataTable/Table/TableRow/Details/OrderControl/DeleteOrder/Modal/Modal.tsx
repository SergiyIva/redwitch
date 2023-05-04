import { Spinner } from "../../../../../../../../../../Components/Spinner/Spinner";
import { MutableRefObject, useContext, useRef, useState } from "react";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { useMutation } from "@apollo/client";
import {
  DELETE_ORDER,
  DeleteOrderType
} from "../../../../../../../../../../GraphQL/Mutation";
import { ErrorMutationAdmin } from "../../../../../../../../../../Components/ErrorMutation/ErrorMutationAdmin";
import {
  GET_ORDERS,
  GetOrdersType
} from "../../../../../../../../../../GraphQL/Query";
import { Order } from "../../../../../../../../../../GraphQL/typeDefs";
import { _GET_ORDERS } from "../../../../../../../../../../GraphQL/TestQuery";
const query = process.env.NODE_ENV === "test" ? _GET_ORDERS : GET_ORDERS;
export const Modal = () => {
  const { row, varsObj } = useContext(TableContext);
  const [error, setError] = useState("");
  const closeBtn = useRef() as MutableRefObject<HTMLButtonElement>;
  const [deleteOrder, { loading, client }] = useMutation<
    DeleteOrderType["DeleteOrder"],
    DeleteOrderType["DeleteOrderVars"]
  >(DELETE_ORDER, {
    variables: {
      id: row!._id
    },
    onCompleted: (data) => {
      if (data.deleteOrder) {
        closeBtn.current.click();
        const orders = client.cache.readQuery<
          GetOrdersType["GetOrders"],
          GetOrdersType["GetOrdersVars"]
        >({
          query,
          variables: varsObj
        });
        if (!orders) return;
        const newOrders: Order[] = orders.getOrdersFeed.orders.filter(
          ({ _id }) => _id !== row!._id
        );
        const newData: GetOrdersType["GetOrders"] = {
          getOrdersFeed: {
            ...orders.getOrdersFeed,
            orders: newOrders,
            totalOrders: orders.getOrdersFeed.totalOrders - 1
          }
        };
        client.cache.writeQuery({
          query,
          variables: varsObj,
          data: newData
        });
      } else {
        setError("Заказ не был удален.");
      }
    },
    onError: (error1) => {
      setError(error1.message);
      console.log(error1);
    }
  });
  const onClick = async () => {
    await deleteOrder();
  };
  return (
    <div
      className="modal fade"
      id={`deleteModal${row?.orderNumber}`}
      tabIndex={-1}
      aria-labelledby="deleteModal"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Подтвердить удаление
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
              Вы действительно хотите удалить заказ №{row!.orderNumber}? Данные
              невозможно будет восстановить.
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
