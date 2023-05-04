import React, { useCallback, useEffect, useState } from "react";
import { calcPositionByCount } from "./Phone";

type PhoneSampleProps = {
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  blur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export const PhoneSample = ({
  value,
  message,
  change,
  blur
}: PhoneSampleProps) => {
  const [localValue, setValue] = useState(value);
  const getPhone = useCallback(() => {
    const valueArr = [...value];
    if (!value.length) return "(___) ___-____";
    const mask = ["("];
    for (let i = 0; i < 10; i++) {
      mask[calcPositionByCount(i)] = valueArr[i] || "_";
    }
    mask[4] = ")";
    mask[5] = " ";
    mask[9] = "-";
    return mask.join("");
  }, [value]);
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/[()_\-\s]+/g, "").trim());
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (blur) blur(e);

    setValue(getPhone());
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      name="phone"
      type="text"
      className={`form-control ${
        message && (message === "isValid" ? "is-valid" : "is-invalid")
      }`}
      id="phone"
      placeholder="999-999-99-99"
      value={localValue}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={change}
      required
    />
  );
};
