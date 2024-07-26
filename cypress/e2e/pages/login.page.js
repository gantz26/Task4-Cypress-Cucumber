/// <reference types="cypress" />

class LoginPage {
  elements = {
    usernameInput: () => cy.get("#user-name"),
    passwordInput: () => cy.get("#password"),
    loginButton: () => cy.get("#login-button"),
    errorMessage: () => cy.get(".error-message-container"),
    loginForm: () => cy.get("#login_button_container")
  }

  get getErrorMessage() {
    return this.elements.errorMessage();
  }
  get getLoginForm() {
    return this.elements.loginForm();
  }

  open() {
    cy.visit("/");
  }

  enterUsername(username) {
    if (username !== "") this.elements.usernameInput().type(username);
  }

  enterPassword(password) {
    if (password !== "") this.elements.passwordInput().type(password);
  }

  clickLoginButton() {
    this.elements.loginButton().click();
  }
}

export default new LoginPage();