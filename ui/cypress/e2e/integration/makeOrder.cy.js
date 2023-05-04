import "@testing-library/cypress/add-commands";

describe("Main page", () => {
  it("allows a user to see info on main page and make order", async () => {
    cy.visit("/");
    cy.findByRole("link", { name: /услуги/i })
      .click()
      .should("not.be.visible");
    cy.findByRole("heading", { name: /дизайн/i })
      .should("be.visible")
      .parent()
      .findByRole("button", { name: /оформить/i })
      .should("be.visible")
      .click({ force: true });
    cy.findByRole("heading", { name: /оформление заявки/i }).should(
      "be.visible"
    );
    cy.findByRole("button", { name: /назад/i })
      .parent()
      .findByRole("button", { name: /далее/i })
      .as("forwardBtn")
      .click({ force: true });
    cy.findByRole("textbox", { name: /имя/i })
      .should("be.visible")
      .type("Test Name")
      .as("nameField");

    cy.findByRole("textbox", { name: /номер телефона/i })
      .type("9999999999")
      .as("phoneField");

    cy.findByRole("textbox", { name: /email/i })
      .type("test@test.ts")
      .should("have.class", "is-valid");
    cy.get("@nameField").should("have.class", "is-valid");
    cy.get("@phoneField").should("have.class", "is-valid");

    cy.get("@forwardBtn").click({ force: true });
    cy.findByRole("textbox", { name: /описание работы/i })
      .should("be.visible")
      .type("Test description of work")
      .should("have.class", "is-valid");

    cy.get("@forwardBtn").click({ force: true });
    cy.findByRole("heading", { name: /подтвердите введенную информацию/i })
      .should("be.visible")
      .parent()
      .should("contain", "Дизайн")
      .should("contain", "Test Name")
      .should("contain", "9999999999")
      .should("contain", "нет");
    cy.findByRole("button", { name: /подтвердить/i }).click();
    cy.findByRole("heading", { name: /благодарим за оформление/i });
    cy.findByRole("button", { name: /ок/i }).click();
  });
});
