import * as S from "./Styles";
import { PropsWithChildren, useState } from "react";
import { useToggle } from "../../Hooks/useToggle";
import { useTimeout } from "../../Hooks/useTimeout";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

type TooltipProps = {
  tooltip?: string | JSX.Element;
  title: string;
  widthInRem?: number;
  direction?: Placement;
};

export const Tooltip = ({
  title,
  tooltip,
  widthInRem,
  children,
  direction = "auto"
}: PropsWithChildren<TooltipProps>) => {
  const [referenceElement, setReferenceElement] = useState<null | HTMLElement>(
    null
  );
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: direction,
    // TODO разобраться в документации, как лучше сделать динамический отступ от элемента
    modifiers: [
      {
        name: "offset",
        options: {
          offset:
            direction.startsWith("left") || direction.startsWith("right")
              ? [0, 6]
              : [6, 0]
        }
      }
    ]
  });
  const [entered, setEntered] = useToggle();
  const [setTimer, clearTimer] = useTimeout(setEntered(true), 1500);

  return (
    <S.Wrapper
      onMouseEnter={setTimer}
      onMouseLeave={() => {
        clearTimer();
        if (entered) {
          setEntered(false)();
        }
      }}
      ref={setReferenceElement}
    >
      {children}
      {entered && (
        <S.Tooltip
          widthInRem={widthInRem}
          ref={setPopperElement}
          style={styles.popper}
          direction={direction}
          {...attributes.popper}
          role={"tooltip"}
        >
          <S.Heading>{title}</S.Heading>
          {tooltip && <S.Paragraph>{tooltip}</S.Paragraph>}
        </S.Tooltip>
      )}
    </S.Wrapper>
  );
};
