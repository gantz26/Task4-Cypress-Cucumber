/// <reference types="cypress" />

class CheckoutPage {
  elements = {
    firstNameInput: () => cy.get('#first-name'),
    lastNameInput: () => cy.get('#last-name'),
    zipCodeInput: () => cy.get('#postal-code'),
    continueButton: () => cy.get('#continue'),
    finishButton: () => cy.get('#finish'),
    orderMessage: () => cy.get('.complete-header'),
    errorMessage: () => cy.get('.error-message-container')
  }

  get getOrderMessage() {
    return this.elements.orderMessage();
  }

  get getErrorMessage() {
    return this.elements.errorMessage();
  }

  enterFirstName(firstName) {
    if (firstName !== "") this.elements.firstNameInput().type(firstName);
  }

  enterLastName(lastName) {
    if (lastName !== "") this.elements.lastNameInput().type(lastName);
  }

  enterZipCode(zipCode) {
    if (zipCode !== "") this.elements.zipCodeInput().type(zipCode);
  }

  clickContinuebutton() {
    this.elements.continueButton().click();
  }

  clickFinishbutton() {
    this.elements.finishButton().click();
  }
}

export default new CheckoutPage();