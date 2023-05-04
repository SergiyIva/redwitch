import React, { PropsWithChildren, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import * as S from "./Styles";
import { useToggleVisible } from "../../Hooks/useToggleVisible";
import { useTimeout } from "../../Hooks/useTimeout";

export type PopVariant = "large" | "medium" | "small";
export type Direction = "top" | "right" | "bottom" | "left";

type PopoverProps = {
  body: { message: string; option?: any };
  direction?: Direction;
  variant?: PopVariant;
  minWidthInRem?: number;
  header?: string;
  actionType?: "click" | "hover";
  disabled?: boolean;
  dataTestid?: string;
};
export const NewPopover = ({
  children,
  header,
  body,
  variant = "large",
  direction = "top",
  actionType = "click",
  disabled = false,
  minWidthInRem = 6,
  dataTestid = "popover"
}: PropsWithChildren<PopoverProps>) => {
  //const [currentDirection, setCurrentDirection] = useState(direction);
  const popoverNode = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [isOpen, isVisible, toggleVisible] = useToggleVisible(150);

  const onEnter = () => {
    if (isVisible || disabled) return;
    toggleVisible();
  };
  // задержка перед всплытием
  const [setTimer, clearTimer] = useTimeout(onEnter, 250);
  const onClick = () => {
    if (isOpen) {
      toggleVisible();
    } else {
      onEnter();
    }
  };

  //TODO react-popper попробовать в качестве позиционного ядра
  // useEffect(() => {
  //   if (popoverNode.current) {
  //     if (
  //       currentDirection === "top" &&
  //       popoverNode.current.getBoundingClientRect().y < 10
  //     )
  //       setCurrentDirection("bottom");
  //     if (
  //       currentDirection === "bottom" &&
  //       window.innerHeight - popoverNode.current.getBoundingClientRect().top <
  //         popoverNode.current.scrollHeight + 10
  //     )
  //       setCurrentDirection("top");
  //     if (
  //       currentDirection === "left" &&
  //       popoverNode.current.getBoundingClientRect().x < 10
  //     )
  //       setCurrentDirection("right");
  //     if (
  //       currentDirection === "right" &&
  //       window.innerWidth - popoverNode.current.getBoundingClientRect().left <
  //         popoverNode.current.scrollWidth + 10
  //     )
  //       setCurrentDirection("left");
  //   }
  // }, [popoverNode.current]);

  return (
    <S.RelativeDivider
      onMouseEnter={actionType === "hover" ? setTimer : () => {}}
      onMouseLeave={
        actionType === "hover"
          ? () => {
              clearTimer();
              if (isOpen) toggleVisible();
            }
          : () => {}
      }
      onClick={actionType === "click" ? onClick : () => {}}
    >
      {children}
      {isOpen && (
        <S.PopoverDivider
          minWidthInRem={minWidthInRem}
          variant={variant}
          isShow={isVisible && !disabled}
          direction={direction}
          ref={popoverNode}
          data-testid={dataTestid}
        >
          <S.Arrow direction={direction} variant={variant} />
          {variant === "large" && (
            <S.HeaderContainer>
              <S.Header>{header}</S.Header>
              <FaRegTimesCircle onClick={toggleVisible} />
            </S.HeaderContainer>
          )}
          <S.Body variant={variant}>
            {body.message}
            {variant === "large" && body.option}
          </S.Body>
        </S.PopoverDivider>
      )}
    </S.RelativeDivider>
  );
};
