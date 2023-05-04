import { orderSKUVar } from "../../../GraphQL/Cache";
import * as S from "./Styles";
import { useCallback, useMemo, useState } from "react";
import { DescribeService } from "./DescribeService/DescribeService";
import { SubHeader } from "./SubHeader/SubHeader";
import { useMutation } from "@apollo/client";
import { ADD_ORDER, AddOrderType } from "../../../GraphQL/Mutation";
import { Spinner } from "../../Spinner/Spinner";
import { ThankYou } from "./ContactData/ThankYou/ThankYou";
import { ContactError } from "./ContactData/ContactError/ContactError";
import { Form } from "./ContactData/Form/Form";
import { useFormInput } from "../../../Hooks/useFormInput";
import {
  Messages,
  validation as getValidation
} from "../../../functions/validation";
import { Confirm } from "./Confirm/Confirm";

type ContentProps = {
  sku: string;
};
export const Content = ({ sku }: ContentProps) => {
  const [currStage, setStage] = useState(1);
  const [formValue] = useFormInput({
    name: "",
    phone: "",
    email: "",
    checkbox: "false",
    content: ""
  });
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
      setValidMessages({
        ...messages,
        isValid: valid.isValid,
        [target.name]: valid[target.name as keyof Messages]
      });
    },
    []
  );
  const [sendForm, { loading, error }] = useMutation<
    AddOrderType["AddOrder"],
    AddOrderType["AddOrderVars"]
  >(ADD_ORDER, {
    onCompleted: (data) => {
      if (data.addOrder) setSuccess("TRUE");
      else setSuccess("FALSE");
    },
    onError: (err) => console.error(err)
  });
  const [success, setSuccess] = useState("");
  const onSubmit = useCallback(async () => {
    const valid = validation({
      ...formValue.value
    });
    setValidMessages(valid);

    if (valid.isValid) {
      await sendForm({
        variables: {
          ...formValue.value,
          subscriber: formValue.value.checkbox === "true",
          description: formValue.value.content,
          sku
        }
      });
    }
  }, [formValue.value, validation]);
  const onClick = async () => {
    if (currStage === 1) setStage(2);
    else if (currStage === 2) {
      const valid = validation({
        name: formValue.value.name,
        phone: formValue.value.phone,
        email: formValue.value.email
      });
      setValidMessages(valid);
      if (valid.isValid) setStage(3);
    } else if (currStage === 3) {
      const valid = validation({
        ...formValue.value
      });
      setValidMessages(valid);
      if (valid.isValid) setStage(4);
    } else await onSubmit();
  };
  const onBack = () => {
    if (currStage > 1) setStage((currStage) => currStage - 1);
  };
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLiveLabel">
          Оформление заявки
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => orderSKUVar("")}
        />
      </div>
      <SubHeader
        currStage={currStage}
        isHidden={
          loading || success === "TRUE" || success === "FALSE" || !!error
        }
      />
      <S.ModalBody
        className="modal-body"
        isOverflow={!loading && success === "" && !error}
        data-testid={"modalBody"}
      >
        {currStage === 1 && <DescribeService idx={sku} />}
        {(currStage === 2 || currStage === 3) && (
          <Form
            formValue={formValue}
            validMessages={validMessages}
            checkValid={checkValid}
            isFirstStage={currStage === 2}
          />
        )}
        {currStage === 4 && (
          <>
            <S.StateDivider
              isHidden={!loading && success === "" && !error}
              data-testid={"stateDiv"}
            >
              {loading && <Spinner />}
              {success === "TRUE" && <ThankYou mail={formValue.value.email} />}
              {(success === "FALSE" || error) && <ContactError />}
            </S.StateDivider>
            <S.Wrapper
              isHidden={
                loading || success === "TRUE" || success === "FALSE" || !!error
              }
            >
              <Confirm values={formValue.value} sku={sku} />
            </S.Wrapper>
          </>
        )}
      </S.ModalBody>
      <div className="modal-footer">
        {success === "TRUE" || success === "FALSE" || !!error ? (
          <button
            type="button"
            className="btn btn-success"
            data-bs-dismiss="modal"
            aria-label="ок"
            onClick={() => orderSKUVar("")}
          >
            Ок
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`btn btn-secondary ${currStage === 1 && "disabled"}`}
              onClick={onBack}
            >
              Назад
            </button>
            <button type="button" className="btn btn-success" onClick={onClick}>
              {currStage === 4 ? "Подтвердить" : "Далее"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
