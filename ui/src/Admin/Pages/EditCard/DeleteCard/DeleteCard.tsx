import { Cardservice } from "../../../../GraphQL/typeDefs";
import { useMutation } from "@apollo/client";
import { DELETE_CARD, DeleteCardType } from "../../../../GraphQL/Mutation";
import { Spinner } from "../../../../Components/Spinner/Spinner";
import { MutableRefObject, useRef } from "react";
import {
  GET_SERVICE_CARDS,
  GetServiceCardsType
} from "../../../../GraphQL/Query";
import { _GET_SERVICE_CARDS } from "../../../../GraphQL/TestQuery";

type DeleteCardProps = {
  card: Cardservice;
  setSuccess: (arg: boolean) => () => void;
  setError: (err: Error) => void;
};
const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARDS : GET_SERVICE_CARDS;
export const DeleteCard = ({ card, setSuccess, setError }: DeleteCardProps) => {
  const [deleteCard, { loading, client }] = useMutation<
    DeleteCardType["DeleteCard"],
    DeleteCardType["DeleteCardVars"]
  >(DELETE_CARD, {
    variables: {
      idx: card.sku
    },
    onCompleted: (data) => {
      closeBtn.current.click();
      if (data.deleteCard) {
        const cards = client.cache.readQuery<
          GetServiceCardsType["GetServiceCards"],
          GetServiceCardsType["GetServiceCardsVars"]
        >({
          query,
          variables: {
            isAll: true
          }
        });
        if (!cards) return;
        const newCards = cards.getCards.filter(({ id }) => card.id !== id);
        const newData = {
          ...cards,
          getCards: newCards
        };
        client.cache.writeQuery({
          query,
          data: newData,
          variables: {
            isAll: true
          }
        });
        setSuccess(true)();
      } else setSuccess(false)();
    },
    onError: (e) => {
      closeBtn.current.click();
      setError(e);
    }
  });
  const closeBtn = useRef() as MutableRefObject<HTMLButtonElement>;
  const onClick = async () => {
    await deleteCard();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger w-100 mt-3"
        data-bs-toggle="modal"
        data-bs-target="#confirmCardDeleteModal"
      >
        Удалить
      </button>
      <div
        className="modal fade"
        id="confirmCardDeleteModal"
        tabIndex={-1}
        aria-labelledby="confirmCardDeleteModal"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmCardDeleteModal">
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
            {loading ? (
              <Spinner />
            ) : (
              <div className="modal-body">
                Вы действительно хотите удалить услугу {card.name}? Данные
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
    </>
  );
};
