import { MutableRefObject, useEffect, useState } from "react";

export const useOnScreen = <T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
): boolean => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    //if (process.env.NODE_ENV === "test") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        //setIntersecting(entry.isIntersecting);
        // *От меня* only one way toggle
        if (!entry.isIntersecting) return;
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);
  return isIntersecting;
};
