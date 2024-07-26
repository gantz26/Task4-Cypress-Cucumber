/// <reference types="cypress" />

import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import cartPage from "../pages/cart.page";
import checkoutPage from "../pages/checkout.page";

When("The user clicks the \"Checkout\" button", () => {
  cartPage.clickCheckoutButton();
})

When(/^The users enters "(.*)" into "First name" field$/, (firstName) => {
  checkoutPage.enterFirstName((firstName !== "") ? faker.person.firstName() : "");
})

When(/^The users enters "(.*)" into "Last name" field$/, (lastName) => {
  checkoutPage.enterLastName((lastName !== "") ? faker.person.lastName() : "");
})

When(/^The users enters "(.*)" into "Zip\/Postal Code" field$/, (zipCode) => {
  checkoutPage.enterZipCode((zipCode !== "") ? faker.location.zipCode() : "");
})

When("The users clicks the {string} button on the checkout page", (buttonName) => {
  switch (buttonName) {
    case "Continue": {
      checkoutPage.clickContinuebutton();
      break;
    }
    case "Finish": {
      checkoutPage.clickFinishbutton();
      break;
    }
  }
})

Then("The checkout is completed and the successful order message is displayed", () => {
  checkoutPage.getOrderMessage.should("be.visible").should("have.text", "Thank you for your order!");
})

Then(/^The (.+) error message is displayed$/, (errorMessage) => {
  checkoutPage.getErrorMessage.should("be.visible").should("have.text", errorMessage);
})