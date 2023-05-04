import React, { useMemo } from "react";
import { EventWithTarget } from "../../../../../../../../../../Hooks/useFormInput";
import { Messages } from "../../../../../../../../../../functions/validation";
import { debounce } from "lodash";
import * as S from "./Styles";
import { PhoneSample } from "../../../../../../../../../../Components/Inputs/PhoneSample";
import { useQuery } from "@apollo/client";
import {
  GET_SERVICE_CARDS,
  GetServiceCardsType
} from "../../../../../../../../../../GraphQL/Query";
import { Spinner } from "../../../../../../../../../../Components/Spinner/Spinner";
import { _GET_SERVICE_CARDS } from "../../../../../../../../../../GraphQL/TestQuery";
import { FieldFormWarning } from "../../../../../../../../../../Components/Messages/FieldFormWarning/FieldFormWarning";

type FormProps = {
  formValue: {
    value: {
      sku: string;
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
  onReset: () => void;
};

const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARDS : GET_SERVICE_CARDS;

export const Form = ({
  formValue,
  checkValid,
  validMessages,
  onReset
}: FormProps) => {
  const { data, error, loading } = useQuery<
    GetServiceCardsType["GetServiceCards"],
    GetServiceCardsType["GetServiceCardsVars"]
  >(query, {
    variables: {
      isAll: true
    }
  });
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

  if (loading) return <Spinner />;
  return (
    <S.Wrapper className="container">
      <form onSubmit={(e) => e.preventDefault()} method="post" role="form">
        <div className="mb-3 position-relative">
          <label htmlFor="select" className="form-label">
            Выбрать услугу
          </label>
          <select
            id="select"
            name={"sku"}
            className={`form-select`}
            disabled={!!error || !data!.getCards.length}
            value={formValue.value.sku}
            onChange={formValue.onChange}
          >
            {data && data.getCards.length ? (
              data.getCards.map(({ sku, name }) => (
                <option value={sku} id={sku} key={sku}>
                  {sku} - {name}
                </option>
              ))
            ) : (
              <option id={"nodataError"}>
                {error ? error.message : "Нет данных"}
              </option>
            )}
          </select>
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="inputName1" className="form-label">
            Имя клиента
          </label>
          <input
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
            onBlur={onBlur}
            required
          />
          <FieldFormWarning
            value={validMessages?.name}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="phone" className="form-label">
            Телефон клиента
          </label>
          <div className="input-group has-validation">
            <span className={"input-group-text"}>+7</span>
            <PhoneSample
              value={formValue.value.phone}
              change={onType}
              message={validMessages?.phone}
              blur={onBlur}
            />
            <FieldFormWarning
              value={validMessages?.phone}
              notAbsolute={true}
              withoutStyle={true}
            />
          </div>
        </div>
        <div className={"position-relative mb-3"}>
          <label htmlFor="inputEmail" className="form-label">
            Email клиента
          </label>
          <input
            type="email"
            name="email"
            className={`form-control ${
              validMessages &&
              validMessages.email &&
              (validMessages.email === "isValid" ? "is-valid" : "is-invalid")
            }`}
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={formValue.value.email}
            onChange={onType}
            onBlur={onBlur}
          />
          <FieldFormWarning
            value={validMessages?.email}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>
        <div className={"position-relative mb-3"}>
          <label htmlFor="content" className="form-label">
            Описание работы
          </label>
          <textarea
            id={"content"}
            name="content"
            className={`form-control ${
              validMessages &&
              validMessages.content &&
              (validMessages.content === "isValid" ? "is-valid" : "is-invalid")
            }`}
            aria-label="Поле ввода описания работы"
            value={formValue.value.content}
            onChange={onType}
            placeholder={"Описание работы"}
          />
          <FieldFormWarning
            value={validMessages?.content}
            notAbsolute={true}
            withoutStyle={true}
          />
        </div>
        <div className={"col-12"} id={"check"}>
          <input
            name="checkbox"
            type="checkbox"
            className="form-check-input"
            id="same-address"
            value={formValue.value.checkbox}
            checked={formValue.value.checkbox === "true"}
            onChange={formValue.onChange}
          />
          <label className="form-check-label mx-1" htmlFor="same-address">
            Клиент подписан на рассылку.
          </label>
        </div>
        <div className={"text-end"}>
          <button
            className={"btn btn-sm btn-outline-warning my-3"}
            onClick={onReset}
          >
            Начальные значения
          </button>
        </div>
      </form>
    </S.Wrapper>
  );
};
