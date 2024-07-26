/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import loginPage from "../pages/login.page.js"
import inventoryPage from "../pages/inventory.page.js";
import { faker } from "@faker-js/faker";

Given("The user is on the login page", () => {
  loginPage.open();
})

When("The user enters {string} into the username field", (username) => {
  if (username === "an invalid username") {
    loginPage.enterUsername(faker.internet.userName());
  }
  else {
    loginPage.enterUsername(username);
  }
})

When("The user enters {string} into the password field", (password) => {
  if (password === "an invalid password") {
    loginPage.enterPassword(faker.internet.password());
  }
  else {
    loginPage.enterPassword(password);
  }
})

When("The user clicks the \"Login\" button on the login page", () => {
  loginPage.clickLoginButton();
})

Then(/^The user (.*) and the (.*) is displayed$/, (result, message) => {
  if (result === "is logged in") {
    inventoryPage.getTitle.should("be.visible").should("have.text", "Products");
  }
  else if (result === "is not logged in") {
    loginPage.getErrorMessage.should("be.visible").should("have.text", message);
  }
})