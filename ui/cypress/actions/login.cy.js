import "@testing-library/cypress/add-commands";

class LogIn {
  login() {
    cy.visit("/admin");
    cy.findByRole("textbox", { name: /имя пользователя/i }).type(
      "administrator"
    );
    cy.findByPlaceholderText(/password/i).type("administrator");
    cy.findByRole("button", { name: /войти/i }).click();
  }
}

export const login = new LogIn();
