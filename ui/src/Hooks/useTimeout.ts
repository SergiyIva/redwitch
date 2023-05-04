import { useEffect, useRef } from "react";

type UseTimeout = (
  callback: (arg?: any) => void,
  delay: number
) => [(arg?: any) => void, () => void];

export const useTimeout: UseTimeout = (callback, delay) => {
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    return () => clearTime();
  }, []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const setTime: ReturnType<UseTimeout>[0] = (arg) => {
    clearTime();
    timerRef.current = setTimeout(() => savedCallback.current(arg), delay);
  };

  const clearTime = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  };

  return [setTime, clearTime];
};
