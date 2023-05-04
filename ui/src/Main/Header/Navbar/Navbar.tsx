import * as S from "./Styles";
import { FaInstagram, FaTwitter, FaVk } from "react-icons/fa";
import { isBackDropVar, slideContactVar } from "../../../GraphQL/Cache";
import { memo, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import useWindowWidth from "../../../Hooks/useWindowWidth";
import { useToggleVisible } from "../../../Hooks/useToggleVisible";
import { useLockBodyScroll } from "../../../Hooks/useLockBodyScroll";
import { Tooltip } from "../../../Components/Tooltip/Tooltip";
const links = [
  {
    title: "Услуги",
    href: "#services"
  },
  {
    title: "Проектирование",
    href: "#project"
  },
  {
    title: "О Нас",
    href: "#about"
  }
];
export const Navbar = memo(() => {
  const isBackDrop = useReactiveVar(isBackDropVar);
  const width = useWindowWidth();
  const onToggler = () => {
    toggle();
    isBackDropVar(!isOpen);
  };
  const onClickLink = () => {
    if (width >= 992) return;
    onToggler();
  };
  const [isOpen, isVisible, toggle] = useToggleVisible(300);
  useEffect(() => {
    if (isVisible && !isBackDrop) toggle();
  }, [isBackDrop]);
  useEffect(() => {
    if (width >= 992 && isVisible) onToggler();
  }, [width]);
  useLockBodyScroll([isVisible]);
  return (
    <>
      <Tooltip
        title={isOpen ? "Закрыть меню" : "Открыть меню"}
        direction={"left"}
        widthInRem={4}
      >
        <S.Trigger
          isActive={isVisible}
          onClick={onToggler}
          data-testid={"toggler"}
        >
          <span />
        </S.Trigger>
      </Tooltip>
      <S.NavDivider
        className={`navbar-collapse`}
        isOpen={isOpen}
        isShow={isVisible}
        id="navbarResponsive"
        data-testid={"mainNavbar"}
      >
        <S.Menu isOpen={isOpen}>
          <S.MenuHeader>Меню</S.MenuHeader>
        </S.Menu>
        <S.ListContainer className="navbar-nav text-uppercase py-lg-0">
          {links.map(({ title, href }) => (
            <S.ListElt key={href}>
              <S.NavLink href={href} onClick={onClickLink}>
                {title}
              </S.NavLink>
            </S.ListElt>
          ))}
          <S.ListElt>
            <S.NavLink
              href={"/#contacts"}
              isSpecial={true}
              onClick={() => {
                onClickLink();
              }}
            >
              Контакты
            </S.NavLink>
          </S.ListElt>
        </S.ListContainer>
        <S.IconContainer>
          <S.IconItem tag={"vk"} onClick={onClickLink}>
            <FaVk />
          </S.IconItem>
          <S.IconItem tag={"twit"} onClick={onClickLink}>
            <FaTwitter />
          </S.IconItem>
          <S.IconItem tag={"inst"} onClick={onClickLink}>
            <FaInstagram />
          </S.IconItem>
        </S.IconContainer>
        <S.Contact isOpen={isOpen}>
          <button
            className={"btn btn-success"}
            onClick={() => {
              slideContactVar(slideContactVar() + 1);
              onClickLink();
            }}
          >
            Связаться с нами
          </button>
        </S.Contact>
      </S.NavDivider>
    </>
  );
});
