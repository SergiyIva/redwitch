import "@testing-library/jest-dom/extend-expect";
import ContactBtn from "./ContactBtn";
import { act, render } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("ContactBtn component", () => {
  it("toggle button - show and hide icons", () => {
    const screen = render(<ContactBtn />);
    const btn = screen.getByText(/контакты/i);
    expect(btn).toBeInTheDocument();
    const wrapper = screen.getByTestId("cntcbtn");
    expect(wrapper).not.toHaveClass("active");
    user.click(btn);
    expect(wrapper).toHaveClass("active");
    user.click(btn);
    expect(wrapper).not.toHaveClass("active");
  });
  it("click on button and show icons then click to top and close icons", () => {
    const screen = render(<ContactBtn />);
    const btn = screen.getByText(/контакты/i);
    expect(btn).toBeInTheDocument();
    const telegramIcon = screen.getByRole("link", { name: /telegram/i });
    const whatsappIcon = screen.getByRole("link", { name: /whatsapp/i });
    const topBtn = screen.getByRole("link", { name: /наверх/i });
    const wrapper = screen.getByTestId("cntcbtn");
    expect(wrapper).not.toHaveClass("active");
    user.click(btn);
    expect(wrapper).toHaveClass("active");
    user.click(telegramIcon);
    user.click(whatsappIcon);
    expect(wrapper).toHaveClass("active");
    user.click(topBtn);
    expect(wrapper).not.toHaveClass("active");
  });
  it("hover icons and show popovers", async () => {
    const screen = render(<ContactBtn />);
    user.click(screen.getByText(/контакты/i));
    const telegramSvg = screen.getByTestId("telegramSvg");
    const whatsappSvg = screen.getByTestId("whatsappSvg");
    const topBtn = screen.getByTestId("topSvg");
    const wrapper = screen.getByTestId("cntcbtn");
    expect(wrapper).toHaveClass("active");

    user.hover(telegramSvg);
    const popoverTelegram = await screen.findByTestId("telegaPop");
    expect(popoverTelegram).toBeInTheDocument();
    expect(popoverTelegram).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 250)));
    expect(popoverTelegram).toBeVisible();
    expect(popoverTelegram).toHaveTextContent(/telegram/i);
    user.unhover(telegramSvg);
    expect(popoverTelegram).toBeInTheDocument();
    expect(popoverTelegram).not.toBeVisible();

    user.hover(whatsappSvg);
    const popoverWhatsApp = await screen.findByTestId("whatsappPop");
    expect(popoverTelegram).not.toBeInTheDocument();
    expect(popoverWhatsApp).toBeInTheDocument();
    expect(popoverWhatsApp).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 250)));
    expect(popoverWhatsApp).toBeVisible();
    expect(popoverWhatsApp).toHaveTextContent(/whatsapp/i);
    user.unhover(whatsappSvg);

    user.hover(topBtn);
    const popoverTop = await screen.findByTestId("topPop");
    expect(popoverTop).toBeInTheDocument();
    expect(popoverTop).not.toBeVisible();
    await act(() => new Promise((res) => setTimeout(res, 250)));
    expect(popoverTop).toBeVisible();
    expect(popoverTop).toHaveTextContent(/наверх/i);
  });
});
