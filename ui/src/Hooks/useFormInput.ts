import React, { useState } from "react";

export type EventWithTarget = {
  target: {
    name: string;
    value: string;
  };
};

export const useFormInput = <
  T extends Object,
  E extends React.ChangeEvent<HTMLElement> & EventWithTarget
>(
  initialValue: T
): [
  { value: T; onChange(e: E): void },
  () => void,
  (name: string, value: string) => void
] => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => {
        const { name, value: newValue } = e.target;
        if (name === "checkbox") {
          if (newValue === "false") {
            setValue({
              ...value,
              [name]: "true"
            });
          } else {
            setValue({
              ...value,
              [name]: "false"
            });
          }
        } else if (name === "login") {
          if (newValue.length >= 200) return;
          if (newValue.includes(".") && newValue.includes("@")) {
            setValue({
              ...value,
              email: newValue,
              username: ""
            });
          } else {
            setValue({
              ...value,
              username: newValue,
              email: ""
            });
          }
        } else if (name === "email") {
          if (newValue.length >= 200) return;
          setValue({
            ...value,
            [name]: newValue
          });
        } else if (name === "content" || name === "message") {
          if (newValue.length >= 1000) return;
          setValue({
            ...value,
            [name]: newValue
          });
        } else if (name === "file" && e.target instanceof HTMLInputElement) {
          if (!e.target.files) return;
          if (!e.target.multiple) {
            e.target.files.length
              ? setValue({
                  ...value,
                  [name]: e.target.files[0]
                })
              : setValue({
                  ...value,
                  [name]: ""
                });
          } else return;
        } else if (name === "phone") {
          const isCheck = checkPhone(newValue);
          if (!isCheck) return;
          setValue({
            ...value,
            [name]: newValue
          });
        } else if (name === "tags") {
          if (newValue.length > 100) return;
          setValue({
            ...value,
            [name]: newValue
          });
        } else {
          //TODO м.б. увеличить до 100
          if (newValue.length > 32) return;
          setValue({
            ...value,
            [name]: newValue
          });
        }
      }
    },
    () => setValue(initialValue),
    (name, newValue) => {
      setValue({
        ...value,
        [name]: newValue
      });
    }
  ];
};

export const checkPhone = (value: string) => {
  if (/\D/.test(value) && !/\([\d_]{3}\)\s[\d_]{3}-[\d_]{4}/.test(value))
    return false;
  const currentValue = value.replace(/[()_\-\s]+/g, "").trim();
  return !(currentValue.length > 10 || /(\D+)/.test(currentValue));
};
