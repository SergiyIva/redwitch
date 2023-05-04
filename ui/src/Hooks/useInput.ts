import React, { useState } from "react";
type EventTargetType = {
  target: {
    value: string;
  };
};
type UseInput = (
  initialValue: string
) => [
  { value: string; onChange: (e: React.ChangeEvent & EventTargetType) => void },
  () => void
];
export const useInput: UseInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: (e) => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};
