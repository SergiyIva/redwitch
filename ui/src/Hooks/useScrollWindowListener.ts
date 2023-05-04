import { useCallback, useEffect, useState } from "react";

export const useScrollWindowListener = () => {
  const [pageY, setPageY] = useState(0);

  const eventHandler = useCallback(() => {
    //общая для компонентов, исп pageY знач и событие прокрутки окна, переменная,
    // д/избежания дублирования слушателей скролла окна
    //scrollPageYVar(e.currentTarget.scrollY);
    setPageY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", eventHandler);
    eventHandler();
    return () => {
      window.removeEventListener("scroll", eventHandler);
    };
  }, []);

  return [pageY];
};
