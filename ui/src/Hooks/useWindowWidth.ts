import { useCallback, useLayoutEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0);

  const resize = useCallback(() => {
    // pageWidthVar(window.innerWidth);
    setWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return width;
}
