import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { invert } from "lodash";

type PhoneProps = {
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message?: string;
  blur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
};
type CP = typeof countsPositions;
type Counts = keyof CP;
const countsPositions = {
  0: 1,
  1: 2,
  2: 3,
  3: 6,
  4: 7,
  5: 8,
  6: 10,
  7: 11,
  8: 12,
  9: 13,
  10: 14
};
const positionsCounts = invert(countsPositions);
export const calcPositionByCount = (numCount: number) => {
  return countsPositions[String(numCount) as unknown as Counts];
};

export const calcCountByPosition = (selectionEnd: number) => {
  return Number(positionsCounts[String(selectionEnd)]);
};

export const Phone = ({
  value,
  message,
  change,
  blur,
  ariaLabel
}: PhoneProps) => {
  const [isFocus, setFocus] = useState(false);
  const [prevState, setState] = useState({ pos: 0, count: 0 });
  const phone = useRef() as MutableRefObject<HTMLInputElement>;
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
  const phoneClick = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    setFocus(true);
    const position = calcPositionByCount(value.length);
    if (
      e.target instanceof HTMLInputElement &&
      e.target.selectionEnd &&
      e.target.selectionEnd > position
    ) {
      changePosition(position);
    } else if (
      e.target instanceof HTMLInputElement &&
      e.target.selectionEnd === 0
    ) {
      changePosition(1);
    }
  };
  const addChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currPos = (e.target.selectionEnd as number) - 1;
    const nextPos = calcPositionByCount(value.length);
    const pos = currPos > nextPos ? nextPos : currPos;
    setState({
      pos,
      count: value.length
    });
    e.target.value = e.target.value.replace(/[()_\-\s]+/g, "").trim();
    change(e);
  };
  const delChar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currPos = (e.target.selectionEnd as number) + 1;
    const nextPos = calcPositionByCount(value.length);
    e.target.value = e.target.value.replace(/[()_\-\s]+/g, "").trim();
    if (e.target.value.length === value.length) {
      if (currPos > nextPos) {
        changePosition(1);
      } else {
        const idx = calcCountByPosition(currPos) - 1;
        e.target.value = [...e.target.value]
          .filter((c, i) => i !== idx)
          .join("");
      }
    }
    setState({
      pos: currPos,
      count: value.length
    });
    change(e);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const match = e.target.value.match(/\d/g) || [];
    if (
      match.length > 10 ||
      (e.target.value.length >= 14 && match.length === value.length)
    )
      return;
    else if (match.length > value.length) addChar(e);
    else delChar(e);
  };

  const changePosition = (pos: number) => {
    phone.current.selectionStart = pos;
    phone.current.selectionEnd = pos;
  };
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        if (e.target instanceof HTMLInputElement && e.target.selectionEnd) {
          const pos = e.target.selectionEnd;
          if (pos < 2) return;
          const count = calcCountByPosition(pos) - 1;
          changePosition(calcPositionByCount(count));
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        if (e.target instanceof HTMLInputElement && e.target.selectionEnd) {
          const pos = e.target.selectionEnd;
          if (pos > 13) return;
          const count = calcCountByPosition(pos) + 1;
          changePosition(calcPositionByCount(count));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  }, []);

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    if (blur) blur(e);
  };

  useEffect(() => {
    if (value.length > prevState.count) {
      changePosition(
        calcPositionByCount(calcCountByPosition(prevState.pos) + 1)
      );
    } else {
      changePosition(
        calcPositionByCount(calcCountByPosition(prevState.pos) - 1)
      );
    }
  }, [value]);
  useEffect(() => {
    if (isFocus) {
      document.addEventListener("keydown", handleKeyDown, true);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isFocus]);

  return (
    <input
      ref={phone}
      name="phone"
      type="text"
      className={`form-control ${
        message && (message === "isValid" ? "is-valid" : "is-invalid")
      }`}
      id="phone"
      placeholder="999-999-99-99"
      aria-label={ariaLabel}
      value={getPhone()}
      onClick={phoneClick}
      onChange={onChange}
      onFocus={phoneClick}
      onBlur={onBlur}
      required
    />
  );
};
