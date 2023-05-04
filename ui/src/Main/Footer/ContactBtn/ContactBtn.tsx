import { useToggle } from "../../../Hooks/useToggle";
import { NewPopover } from "../../../Components/NewPopover/NewPopover";
import { FaChevronCircleUp } from "react-icons/fa";

export default function ContactBtn() {
  const [isBtnActive, toggleBtnActive] = useToggle();

  return (
    <div
      className={`contact-button-wrap ${isBtnActive && "active"}`}
      data-testid={"cntcbtn"}
    >
      <div className={`contact-button`} onClick={toggleBtnActive()}>
        <span className="app-shortcut-icon d-block" />
        <span className={"screen-reader"}>Контакты</span>
      </div>
      <a
        href={"#"}
        className={"contact-item to-top"}
        onClick={toggleBtnActive(false)}
      >
        <span className={"screen-reader"}>Наверх</span>
        <NewPopover
          body={{ message: "Наверх" }}
          variant={"small"}
          actionType={"hover"}
          direction={"left"}
          minWidthInRem={5}
          disabled={!isBtnActive}
          dataTestid={"topPop"}
        >
          <FaChevronCircleUp data-testid={"topSvg"} />
        </NewPopover>
      </a>
      <a href={"#"} className={"contact-item telega-item"}>
        <span className={"screen-reader"}>Telegram</span>
        <NewPopover
          body={{ message: "Telegram" }}
          variant={"small"}
          actionType={"hover"}
          direction={"left"}
          minWidthInRem={5}
          disabled={!isBtnActive}
          dataTestid={"telegaPop"}
        >
          <svg
            role="presentation"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid={"telegramSvg"}
          >
            <path
              d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
              fill="#0087D0"
            />
            <path
              d="M36.11 13.0399L9.40999 22.7999C8.86999 22.9999 8.85999 23.7999 9.38999 24.0299L16.23 26.7199L18.78 34.4099C18.93 34.8199 19.47 34.9599 19.81 34.6799L23.73 31.1899L31.17 35.9099C31.55 36.1499 32.06 35.9399 32.15 35.5099L36.99 13.7599C37.09 13.2799 36.59 12.8699 36.11 13.0599V13.0399ZM20.03 28.1599L19.6 32.1199L17.53 26.0299L32.1 16.8699L20.03 28.1699V28.1599Z"
              fill="white"
            />
          </svg>
        </NewPopover>
      </a>

      <a href={"#"} className={"contact-item whatsapp-item"}>
        <span className={"screen-reader"}>WhatsApp</span>
        <NewPopover
          body={{ message: "WhatsApp" }}
          variant={"small"}
          actionType={"hover"}
          direction={"left"}
          minWidthInRem={5}
          disabled={!isBtnActive}
          dataTestid={"whatsappPop"}
        >
          <svg
            role="presentation"
            width="50"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid={"whatsappSvg"}
          >
            {" "}
            <path d="M25 50a25 25 0 100-50 25 25 0 000 50z" fill="#fff" />{" "}
            <path
              d="M26.1 12a12.1 12.1 0 00-10.25 18.53l.29.46-1.22 4.46 4.57-1.2.45.27a12.1 12.1 0 106.16-22.51V12zm6.79 17.22c-.3.85-1.72 1.62-2.41 1.72-.62.1-1.4.14-2.25-.14-.7-.22-1.37-.47-2.03-.77-3.59-1.57-5.93-5.24-6.1-5.48-.19-.24-1.47-1.97-1.47-3.76 0-1.79.93-2.67 1.25-3.03.33-.37.72-.46.96-.46.23 0 .47 0 .68.02.22 0 .52-.09.8.62l1.1 2.7c.1.18.16.4.04.64s-.18.39-.36.6c-.18.21-.38.47-.54.64-.18.18-.36.38-.15.74.2.36.92 1.55 1.98 2.52 1.37 1.23 2.52 1.62 2.88 1.8.35.18.56.15.77-.1.2-.23.9-1.05 1.13-1.42.24-.36.48-.3.8-.18.33.12 2.09 1 2.44 1.18.36.19.6.28.69.43.09.15.09.88-.21 1.73z"
              fill="#27D061"
            />{" "}
            <path
              d="M25 0a25 25 0 100 50 25 25 0 000-50zm1.03 38.37c-2.42 0-4.8-.6-6.9-1.76l-7.67 2 2.05-7.45a14.3 14.3 0 01-1.93-7.2c0-7.92 6.49-14.38 14.45-14.38a14.4 14.4 0 110 28.79z"
              fill="#27D061"
            />{" "}
          </svg>
        </NewPopover>
      </a>
    </div>
  );
}
