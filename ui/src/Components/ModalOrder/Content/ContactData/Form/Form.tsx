import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Messages } from "../../../../../functions/validation";
import * as S from "./Styles";
import { debounce } from "lodash";
import { EventWithTarget } from "../../../../../Hooks/useFormInput";
import { Phone } from "../../../../Inputs/Phone";
import { FieldFormWarning } from "../../../../Messages/FieldFormWarning/FieldFormWarning";

export type FormProps = {
  formValue: {
    value: {
      phone: string;
      name: string;
      checkbox: string;
      email: string;
      content: string;
    };
    onChange(e: React.ChangeEvent<HTMLElement> & EventWithTarget): void;
  };
  validMessages: Messages | null;
  checkValid: (
    target:
      | (EventTarget & HTMLInputElement)
      | (EventTarget & HTMLTextAreaElement),
    messages: Messages | null
  ) => void;
  isFirstStage: boolean;
};

export const Form = ({
  formValue,
  validMessages,
  checkValid,
  isFirstStage
}: FormProps) => {
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    name.current.focus();
  }, []);

  const debouncedFn = useMemo(
    () =>
      debounce(
        (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          messages: typeof validMessages
        ) => {
          checkValid(e.target, messages);
        },
        1500
      ),
    []
  );
  const onType = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formValue.onChange(e);
    debouncedFn(e, validMessages);
  };
  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    checkValid(e.target, validMessages);
  };
  return (
    <div className="container">
      <form method="post" role="form">
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
                aria-label="Имя"
                value={formValue.value.name}
                onChange={onType}
                onBlur={onBlur}
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
                  blur={onBlur}
                  ariaLabel={"номер телефона"}
                />
                {/*<PhoneSample*/}
                {/*  value={formValue.value.phone}*/}
                {/*  change={onType}*/}
                {/*  message={validMessages?.phone}*/}
                {/*  blur={onBlur}*/}
                {/*/>*/}
                <FieldFormWarning value={validMessages?.phone} />
              </div>
            </div>
            <div className="position-relative">
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
                aria-label={"email"}
                placeholder="Email"
                value={formValue.value.email}
                onChange={onType}
                onBlur={onBlur}
              />
              <FieldFormWarning value={validMessages?.email} />
            </div>
            <S.CheckDivider id="check" className={`form-check`}>
              <input
                name="checkbox"
                type="checkbox"
                className="form-check-input"
                id="same-address"
                checked={formValue.value.checkbox === "true"}
                value={formValue.value.checkbox}
                onChange={formValue.onChange}
              />
              <S.CheckLabel htmlFor="same-address">
                Оповещать меня о проводимых акциях и специальных предложениях.
              </S.CheckLabel>
            </S.CheckDivider>
          </S.FirstDivider>
          <S.SecondDivider isFirst={isFirstStage}>
            <div>
              <S.Textarea
                name="content"
                className={`form-control ${
                  validMessages &&
                  validMessages.content &&
                  (validMessages.content === "isValid"
                    ? "is-valid"
                    : "is-invalid")
                }`}
                aria-label="Описание работы"
                value={formValue.value.content}
                onChange={onType}
                onBlur={onBlur}
                placeholder={"Описание работы"}
              />
              <FieldFormWarning
                value={validMessages?.content}
                notAbsolute={true}
              />
              <S.Describe id="messageHelp" className="form-text">
                Опишите задачу и укажите дополнительную информацию.
              </S.Describe>
            </div>
          </S.SecondDivider>
        </S.Wrapper>
        <S.InfoLabel id="formInfo" className="form-text">
          Мы не передаем личные данные третьим лицам.
        </S.InfoLabel>
      </form>
    </div>
  );
};
