import React, {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Messages,
  validation as getValidation
} from "../../../../../../functions/validation";
import { MutationTuple, useReactiveVar } from "@apollo/client";
import * as S from "./Styles";
import { useFormInput } from "../../../../../../Hooks/useFormInput";
import { AddCallorderType } from "../../../../../../GraphQL/Mutation";
import { slideContactVar } from "../../../../../../GraphQL/Cache";
import { debounce } from "lodash";
import { Phone } from "../../../../../../Components/Inputs/Phone";
import { FieldFormWarning } from "../../../../../../Components/Messages/FieldFormWarning/FieldFormWarning";

type FormProps = {
  action: MutationTuple<
    AddCallorderType["AddCallorder"],
    AddCallorderType["AddCallorderVars"]
  >[0];
};

export const Form = ({ action }: FormProps) => {
  const [formValue, reset] = useFormInput({
    name: "",
    phone: "",
    email: "",
    checkbox: "false",
    message: ""
  });
  const [validMessages, setValidMessages] = useState<Messages | null>(null);
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const triggerFocus = useReactiveVar(slideContactVar);
  const [isFirstStage, setFirstStage] = useState(true);

  const isTransDown =
    validMessages && validMessages.email && validMessages.email !== "isValid";

  const validation = useMemo(
    () =>
      getValidation({
        optional: ["email", "message"]
      }),
    []
  );
  const checkValid = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      messages: typeof validMessages
    ) => {
      const valid = validation({
        [e.target.name]: e.target.value
      });
      setValidMessages({
        ...messages,
        isValid: valid.isValid,
        [e.target.name]: valid[e.target.name as keyof Messages]
      });
    },
    []
  );
  const debouncedFn = useMemo(
    () =>
      debounce(
        (
          e: React.ChangeEvent<HTMLInputElement>,
          messages: typeof validMessages
        ) => {
          checkValid(e, messages);
        },
        500
      ),
    []
  );
  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    formValue.onChange(e);
    debouncedFn(e, validMessages);
  };
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const valid = validation({
        ...formValue.value
      });
      setValidMessages(valid);
      if (valid.isValid) {
        if (isFirstStage) {
          setFirstStage(false);
          return;
        }
        await action({
          variables: {
            ...formValue.value,
            subscriber: formValue.value.checkbox === "true",
            describe: formValue.value.message
          }
        });
        // очистка формы
        reset();
        //чтобы убрать видимость кнопки назад
        setFirstStage(true);
      }
    },
    [formValue.value, validation, isFirstStage]
  );

  useEffect(() => {
    if (triggerFocus) {
      name.current.focus();
    }
  }, [triggerFocus]);

  return (
    <div className="container">
      <form onSubmit={onSubmit} method="post" role="form">
        <S.Wrapper>
          <S.FirstDivider isFirst={isFirstStage}>
            <div className="mb-4 position-relative">
              <input
                ref={name}
                type="text"
                name="name"
                className={`form-control ${
                  validMessages &&
                  validMessages.name &&
                  (validMessages.name === "isValid" ? "is-valid" : "is-invalid")
                }`}
                id="inputName1"
                placeholder="Имя"
                value={formValue.value.name}
                onChange={onType}
                required
              />
              <FieldFormWarning value={validMessages?.name} />
            </div>
            <div className="mb-4 position-relative">
              <div className="input-group has-validation">
                <span className={"input-group-text"}>+7</span>
                <Phone
                  value={formValue.value.phone}
                  change={onType}
                  message={validMessages?.phone}
                />
                <FieldFormWarning value={validMessages?.phone} />
              </div>
            </div>
            <div className="mb-3 position-relative">
              <input
                type="email"
                name="email"
                className={`form-control ${
                  validMessages &&
                  validMessages.email &&
                  (validMessages.email === "isValid"
                    ? "is-valid"
                    : "is-invalid")
                }`}
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email (не обязательно)"
                value={formValue.value.email}
                onChange={onType}
              />
              <FieldFormWarning value={validMessages?.email} />
              <S.CheckDivider
                id="check"
                isVisible={!!formValue.value.email}
                isTransDown={!!isTransDown}
                className={`form-check`}
              >
                <input
                  name="checkbox"
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                  value={formValue.value.checkbox}
                  onChange={formValue.onChange}
                />
                <S.CheckLabel htmlFor="same-address">
                  Оповещать меня о проводимых акциях и специальных предложениях.
                </S.CheckLabel>
              </S.CheckDivider>
            </div>
          </S.FirstDivider>
          <S.SecondDivider isFirst={isFirstStage}>
            <div className="mb-3">
              <S.Textarea
                name="message"
                className="form-control"
                aria-label="Сообщение"
                value={formValue.value.message}
                onChange={formValue.onChange}
                placeholder={"Сообщение (не обязательно)"}
              />
              <div id="messageHelp" className="form-text">
                Укажите дополнительную информацию тут.
              </div>
            </div>
          </S.SecondDivider>
        </S.Wrapper>
        <S.BtnsWrapper>
          <S.ButtonBack
            isFirst={isFirstStage}
            id="buttonBack"
            className={`btn btn-success`}
            onClick={() => {
              setFirstStage(true);
            }}
            data-testid={"buttonBack"}
          >
            Назад
          </S.ButtonBack>
          <button
            id="buttonSub"
            type="submit"
            className={`btn btn-success ${
              (!formValue.value.name || !formValue.value.phone) && "disabled"
            }`}
            onClick={(e) => {
              if (e.target instanceof HTMLButtonElement) {
                e.target.blur();
              }
            }}
          >
            {isFirstStage ? "Далее" : "Отправить"}
          </button>
        </S.BtnsWrapper>
        <S.InfoLabel id="emailHelp" className="form-text">
          Мы не передаем личные данные третьим лицам.
        </S.InfoLabel>
      </form>
    </div>
  );
};
