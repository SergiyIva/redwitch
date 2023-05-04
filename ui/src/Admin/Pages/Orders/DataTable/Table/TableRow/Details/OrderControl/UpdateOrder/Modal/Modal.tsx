import { ErrorMutationAdmin } from "../../../../../../../../../../Components/ErrorMutation/ErrorMutationAdmin";
import { Spinner } from "../../../../../../../../../../Components/Spinner/Spinner";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useMutation } from "@apollo/client";
import {
  UPDATE_ORDER,
  UpdateOrderType
} from "../../../../../../../../../../GraphQL/Mutation";
import { TableContext } from "../../../../../../../TableContext/TableContext";
import { Form } from "../Form/Form";
import { useFormInput } from "../../../../../../../../../../Hooks/useFormInput";
import {
  Messages,
  validation as getValidation
} from "../../../../../../../../../../functions/validation";
import { _UPDATE_ORDER } from "../../../../../../../../../../GraphQL/TestMute";

const mute = process.env.NODE_ENV === "test" ? _UPDATE_ORDER : UPDATE_ORDER;

export const Modal = () => {
  const isMount = useRef(false) as MutableRefObject<any>;
  const { row } = useContext(TableContext);
  const [formValue, reset] = useFormInput({
    sku: row!.serviceId,
    name: row!.name,
    phone: row!.phone,
    email: row!.email,
    checkbox: row!.subscriber ? "true" : "false",
    content: row!.description
  });
  const [error, setError] = useState("");
  const [validMessages, setValidMessages] = useState<Messages | null>(null);
  const validation = useMemo(
    () =>
      getValidation({
        optional: []
      }),
    []
  );
  const checkValid = useCallback(
    (
      target:
        | (EventTarget & HTMLInputElement)
        | (EventTarget & HTMLTextAreaElement),
      messages: typeof validMessages
    ) => {
      const valid = validation({
        [target.name]: target.value
      });
      if (isMount.current)
        setValidMessages({
          ...messages,
          isValid: valid.isValid,
          [target.name]: valid[target.name as keyof Messages]
        });
    },
    []
  );
  const onReset = () => {
    reset();
    setValidMessages(null);
  };
  const [update, { loading }] = useMutation<
    UpdateOrderType["UpdateOrder"],
    UpdateOrderType["UpdateOrderVars"]
  >(mute, {
    onCompleted: () => {
      closeBtn.current.click();
    },
    onError: (err) => {
      setError(err.message);
      console.log(err);
    }
  });
  const closeBtn = useRef() as MutableRefObject<HTMLButtonElement>;
  const onClick = async () => {
    const variables = {
      ...formValue.value,
      subscriber: formValue.value.checkbox === "true",
      description: formValue.value.content,
      id: row!._id
    };
    await update({
      variables
    });
  };
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);
  return (
    <div
      className="modal fade"
      id={`updateModal${row?.orderNumber}`}
      tabIndex={-1}
      aria-labelledby="updateModal"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="changeModalLabel">
              Изменение данных заказа
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
            <div className="modal-body px-3 py-1">
              <div className={"fw-bold mb-2"}>
                Внесите изменения в заказ №{row!.orderNumber}:
              </div>
              <Form
                formValue={formValue}
                checkValid={checkValid}
                validMessages={validMessages}
                onReset={onReset}
              />
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
            {!error && (
              <button
                id="delBtn"
                type="button"
                className="btn btn-success"
                onClick={onClick}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
