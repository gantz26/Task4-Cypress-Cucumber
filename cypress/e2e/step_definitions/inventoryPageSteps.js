/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import loginPage from "../pages/login.page.js"
import inventoryPage from "../pages/inventory.page.js";
import cartPage from "../pages/cart.page.js";

let productName;
let productsCount;

Given("The user is logged in and on the inventory page", () => {
  loginPage.open();
  loginPage.enterUsername("standard_user");
  loginPage.enterPassword("secret_sauce");
  loginPage.clickLoginButton();
  inventoryPage.getTitle.should("be.visible").should("have.text", "Products");
})

When("The user cliks the burger menu", () => {
  inventoryPage.clickBurgerMenu();
})

When("The user cliks the logout link", () => {
  inventoryPage.clickLogoutLink();
})

Then("The user is logged out and on the login page", () => {
  loginPage.getLoginForm.should("be.visible");
})

When("The user clicks the \"Add to cart\" button", () => {
  inventoryPage.getOneOfProducts.then($product => {
    inventoryPage.getProductName(cy.wrap($product)).invoke("text").then(text => {
      productName = text;
    })
    inventoryPage.getProductAddButton(cy.wrap($product)).click();
    inventoryPage.getProductsCount.invoke("text").then(count => {
      productsCount = count;
    })
  })
})

When("The user click the cart icon", () => {
  inventoryPage.clickCartIcon();
})

Then("The cart page is opened", () => {
  cartPage.getTitle.should("be.visible").should("have.text", "Your Cart");
})

Then("The added product is displayed", () => {
  cartPage.getCartProducts.then($products => {
    cy.wrap($products).should("contain.text", productName);
  })
})

Then("The number near the cart icon is increased by 1", () => {
  cartPage.getProductsCount.should("have.text", productsCount);
})

Given("There is the added product in the cart", () => {
  inventoryPage.getOneOfProducts.then($product => {
    inventoryPage.getProductName(cy.wrap($product)).invoke("text").then(text => {
      productName = text;
    })
    inventoryPage.getProductAddButton(cy.wrap($product)).click();
  })
})

When("The user clicks the \"Remove\" button", () => {
  cartPage.getProductByName(productName).then($product => {
    cartPage.clickRemoveButton(cy.wrap($product));
  })
})

Then("The product is removed", () => {
  cartPage.getCartProducts.should("not.exist");
  cartPage.getProductsCount.should("not.exist");
})

When(/^The user selects the option (.+)$/, (option) => {
  inventoryPage.selectSortOption(option);
})

Then(/^The product are sorted by (.*) order$/, (option) => {
  inventoryPage.getProducts.then($products => {
    const length = $products.length;
    for (let i = 0; i < length - 1; ++i) {
      switch (option) {
        case "Name (A to Z)": {
          inventoryPage.getProductName(cy.wrap($products[i])).invoke("text").then(firstTitle => {
            inventoryPage.getProductName(cy.wrap($products[i + 1])).invoke("text").then(secondTitle => {
              expect(firstTitle.localeCompare(secondTitle)).to.be.lessThan(0);
            })
          })
          break;
        }
        case "Name (Z to A)": {
          inventoryPage.getProductName(cy.wrap($products[i])).invoke("text").then(firstTitle => {
            inventoryPage.getProductName(cy.wrap($products[i + 1])).invoke("text").then(secondTitle => {
              expect(firstTitle.localeCompare(secondTitle)).to.be.greaterThan(0);
            })
          })
          break;
        }
        case "Price (low to high)": {
          inventoryPage.getProductPrice(cy.wrap($products[i])).invoke("text").then(firstPrice => {
            const newFirstPrice = parseFloat(firstPrice.substring(1));
            inventoryPage.getProductPrice(cy.wrap($products[i + 1])).invoke("text").then(secondPrice => {
              const newSecondPrice = parseFloat(secondPrice.substring(1));
              expect(newFirstPrice).to.be.lte(newSecondPrice);
            })
          })
          break;
        }
        case "Price (high to low)": {
          inventoryPage.getProductPrice(cy.wrap($products[i])).invoke("text").then(firstPrice => {
            const newFirstPrice = parseFloat(firstPrice.substring(1));
            inventoryPage.getProductPrice(cy.wrap($products[i + 1])).invoke("text").then(secondPrice => {
              const newSecondPrice = parseFloat(secondPrice.substring(1));
              expect(newFirstPrice).to.be.gte(newSecondPrice);
            })
          })
          break;
        }
      }
    }
  })
})

When(/^The user clicks the (.*) link$/, (socialLink) => {
  switch (socialLink) {
    case "X": {
      inventoryPage.getXLink.then(link => {
        cy.origin('https://x.com', () => {
          cy.on('uncaught:exception', (e) => {
            if (e.message.includes('U')) {
              return false
            }
          })
        })
        cy.visit(link);
      })
      break;
    }
    case "Facebook": {
      inventoryPage.getFacebookLink.then(link => {
        cy.visit(link);
      })
      break;
    }
    case "LinkedIn": {
      inventoryPage.getLinkedInLink.then(link => {
        cy.visit(link, { failOnStatusCode: false });
      })
      break;
    }
  }
})

Then(/^The site profile in (.*) social network is opened$/, (socialLink) => {
  switch (socialLink) {
    case "X": {
      cy.url({ timeout: 10000 }).should("eq", "https://x.com/saucelabs");
      break;
    }
    case "Facebook": {
      cy.url({ timeout: 10000 }).should("eq", "https://www.facebook.com/saucelabs");
      break;
    }
    case "LinkedIn": {
      cy.url({ timeout: 10000 }).should("eq", "https://www.linkedin.com/company/sauce-labs/");
      break;
    }
  }
})