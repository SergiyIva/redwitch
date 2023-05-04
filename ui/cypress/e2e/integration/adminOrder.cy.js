import "@testing-library/cypress/add-commands";
import { login } from "../../actions/login.cy";

describe("Orders", () => {
  it("find user's order", () => {
    login.login();
    cy.findByRole("heading", { name: /панель управления/i }).should(
      "be.visible"
    );
    cy.findByRole("link", { name: "Заказы" }).click();
    cy.findByRole("heading", { name: /все заказы/i }).should("be.visible");
    cy.findByRole("searchbox", { name: /общий поиск/i }).type("test name");
    cy.findByRole("row", {
      name: /test name/i
    })
      .should("be.visible")
      .click("left");
    cy.findByRole("button", { name: /удалить/i }).click();
    cy.findByRole("button", { name: /подтвердить/i }).click();
    cy.findByText(/данные не получены/i).should("be.visible");
  });
});
