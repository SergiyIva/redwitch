import { useCallback, useEffect, useState } from "react";
import { useTimeout } from "./useTimeout";

type UseToggleVisible = (
  delay: number,
  depend?: boolean
) => [boolean, boolean, () => void];

export const useToggleVisible: UseToggleVisible = (delay, depend = true) => {
  const [isOpen, toggleOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [setTimerToggleOpen, clearTimerToggleOpen] = useTimeout(
    () => toggleOpen(false),
    delay
  );
  const [setTimerToggleShow, clearTimerToggleShow] = useTimeout(
    () => setVisible(true),
    10
  );

  const toggleVisible = useCallback(() => {
    if (isVisible) {
      clearTimerToggleShow();
      clearTimerToggleOpen();
      setVisible(false);
      setTimerToggleOpen();
    } else {
      clearTimerToggleShow();
      clearTimerToggleOpen();
      toggleOpen(true);
      setTimerToggleShow();
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      clearTimerToggleOpen();
      clearTimerToggleShow();
    };
  }, []);

  return [isOpen, isVisible, toggleVisible];
};
