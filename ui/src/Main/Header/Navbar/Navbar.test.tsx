import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../Styles/theme";
import { isBackDropVar, slideContactVar } from "../../../GraphQL/Cache";
import { BackDrop } from "../../../Components/BackDrop/BackDrop";

const customGlobal: any = global;

describe("Navbar (Main/Home) component", () => {
  const BaseComponent = () => (
    <ThemeProvider theme={lightTheme}>
      <Navbar />
    </ThemeProvider>
  );
  it("Navbar rendering", () => {
    const screen = render(<BaseComponent />);
    expect(screen.getByTestId("mainNavbar")).toBeInTheDocument();
  });
  it("Toggle btn click", async () => {
    const screen = render(<BaseComponent />);
    const btnToggle = screen.getByTestId("toggler");
    expect(btnToggle).toBeInTheDocument();
    user.click(btnToggle);
    const isBlackDrop = isBackDropVar();
    expect(isBlackDrop).toBeTruthy();
    const heading = await screen.findByRole("heading", { name: /меню/i });
    expect(heading).toBeVisible();
    const listMenuElt = screen.getByRole("link", { name: /услуги/i });
    expect(listMenuElt).toBeInTheDocument();
    const contactUsBtn = screen.getByRole("button", {
      name: /связаться с нами/i
    });
    expect(contactUsBtn).toBeInTheDocument();
    user.click(btnToggle);
    await act(() => new Promise((res) => setTimeout(res, 300)));
    const isBlackDrop2 = isBackDropVar();
    expect(isBlackDrop2).not.toBeTruthy();
    expect(heading).not.toBeVisible();
  });
  it("Toggle menu by click on link or contact-button", async () => {
    customGlobal.innerWidth = 900;
    const screen = render(<BaseComponent />);

    const btnToggle = screen.getByTestId("toggler");
    expect(btnToggle).toBeInTheDocument();
    user.click(btnToggle);
    const heading = await screen.findByRole("heading", { name: /меню/i });
    expect(heading).toBeVisible();

    const listMenuElt = screen.getByRole("link", { name: /услуги/i });
    user.click(listMenuElt);
    await act(() => new Promise((res) => setTimeout(res, 300)));
    expect(heading).not.toBeVisible();

    user.click(btnToggle);
    const contactListElt = await screen.findByRole("link", {
      name: /контакты/i
    });
    user.click(contactListElt);
    await act(() => new Promise((res) => setTimeout(res, 300)));
    expect(heading).not.toBeVisible();
    expect(window.location.hash).toBe("#contacts");

    user.click(btnToggle);
    const slideCountBefore = slideContactVar();
    const contactUsBtn = await screen.findByRole("button", {
      name: /связаться с нами/i
    });
    user.click(contactUsBtn);
    await act(() => new Promise((res) => setTimeout(res, 300)));
    const slideCountAfter = slideContactVar();
    expect(heading).not.toBeVisible();
    expect(slideCountAfter - slideCountBefore).toBe(1);
  });
  it("Toggle menu by click on bg", async () => {
    const screen = render(
      <ThemeProvider theme={lightTheme}>
        <BackDrop />
        <Navbar />
      </ThemeProvider>
    );
    const btnToggle = screen.getByTestId("toggler");
    expect(btnToggle).toBeInTheDocument();
    user.click(btnToggle);
    const heading = await screen.findByRole("heading", { name: /меню/i });
    expect(heading).toBeVisible();
    const bg = screen.getByTestId("backdrop");
    expect(bg).toBeInTheDocument();
    user.click(bg);
    await act(() => new Promise((res) => setTimeout(res, 300)));
    expect(bg).not.toBeInTheDocument();
    expect(heading).not.toBeVisible();
  });
  it("click link with window size more than 992px", async () => {
    customGlobal.innerWidth = 1000;
    const screen = render(<BaseComponent />);
    const contactListElt = screen.getByRole("link", { name: /контакты/i });
    user.click(contactListElt);
    const heading = screen.getByRole("heading", {
      name: /меню/i,
      hidden: true
    });
    expect(heading).not.toBeVisible();
  });
  it("change window size event provide closing menu", async () => {
    customGlobal.innerWidth = 500;
    const screen = render(<BaseComponent />);
    const btnToggle = screen.getByTestId("toggler");
    expect(btnToggle).toBeInTheDocument();
    user.click(btnToggle);
    const heading = await screen.findByRole("heading", { name: /меню/i });
    expect(heading).toBeVisible();
    act(() => {
      customGlobal.innerWidth = 1000;
      fireEvent(customGlobal, new Event("resize"));
    });
    await act(() => new Promise((res) => setTimeout(res, 300)));
    expect(heading).not.toBeVisible();
  });
  it("hover menu-toggle-button, given tooltip message", async () => {
    customGlobal.innerWidth = 900;
    const screen = render(<BaseComponent />);
    const btnToggle = screen.getByTestId("toggler");
    user.hover(btnToggle);
    await act(() => new Promise((res) => setTimeout(res, 1500)));
    expect(
      screen.getByRole("heading", { name: /открыть меню/i })
    ).toBeVisible();
    user.click(btnToggle);
    expect(
      screen.getByRole("heading", { name: /закрыть меню/i })
    ).toBeVisible();
    user.unhover(btnToggle);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
