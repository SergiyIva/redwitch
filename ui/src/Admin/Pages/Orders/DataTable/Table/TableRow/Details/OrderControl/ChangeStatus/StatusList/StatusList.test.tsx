import { dataStatuses, OrderStatusList } from "./StatusList";
import { StatusVars } from "../../../../../../../../../../GraphQL/typeDefs";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { lightTheme } from "../../../../../../../../../../Styles/theme";
import { ThemeProvider } from "styled-components";
import { useState } from "react";

describe("StatusList", () => {
  const Wrapper = () => {
    const [status, setStatus] = useState(StatusVars.accepted);
    return (
      <ThemeProvider theme={lightTheme}>
        <OrderStatusList currStatus={status} setStatus={setStatus} />
      </ThemeProvider>
    );
  };

  test(
    "given click 'done' radio btn in list, shows " +
      "'Заказ полностью завершен, отдан заказчику'",
    () => {
      const screen = render(<Wrapper />);
      const doneStatusElt = screen.getByRole("radio", { name: /выполнен/i });
      user.click(doneStatusElt);
      const doneStatusDescriptionElt = screen.getByRole("radio", {
        name: /заказ полностью завершен, отдан заказчику/i
      });
      expect(doneStatusDescriptionElt).toBeInTheDocument();
      expect(doneStatusElt).not.toHaveTextContent(
        /заказ обработан системой и ждет подтверждения/i
      );
    }
  );
  test(
    "given click 'accepted' radio btn in list, change nothing, show" +
      "'Заказ полностью завершен, отдан заказчику'",
    () => {
      const screen = render(<Wrapper />);
      const acceptedStatusElt = screen.getByRole("radio", { name: /Принят/i });
      user.click(acceptedStatusElt);
      const acceptedStatusDescriptionElt = screen.getByRole("radio", {
        name: /Заказ обработан системой и ждет подтверждения/i
      });
      expect(acceptedStatusDescriptionElt).toBeInTheDocument();
      const doneStatusElt = screen.getByRole("radio", {
        name: /Выполнен/i
      });
      expect(doneStatusElt).not.toHaveTextContent(
        /заказ полностью завершен, отдан заказчику/i
      );
    }
  );
  test("check existing of all statuses", () => {
    const screen = render(<Wrapper />);
    const dataText = dataStatuses.map(({ title }) => title);
    dataText.forEach((title) => {
      const regexp = new RegExp(title);
      const statusElt = screen.getByRole("radio", { name: regexp });
      expect(statusElt).toBeInTheDocument();
    });
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
