import { useLayoutEffect } from "react";

export const useLockBodyScroll = (deps?: ReadonlyArray<any>) => {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect(
    (): (() => void) => {
      // Get original body overflow
      const originalStyle: string = window.getComputedStyle(
        document.body
      ).overflow;
      if (deps) {
        if (deps.some((d) => d === true)) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = originalStyle;
        }
      } else {
        // Prevent scrolling on mount
        document.body.style.overflow = "hidden";
      }
      // Re-enable scrolling when component unmounts
      return () => (document.body.style.overflow = originalStyle);
    },
    deps ? deps : []
  ); // Empty array ensures effect is only run on mount and unmount
};
