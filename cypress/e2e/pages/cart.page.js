/// <reference types="cypress" />

class CartPage {
  elements = {
    title: () => cy.get(".title"),
    productsCount: () => cy.get(".shopping_cart_badge"),
    checkoutButton: () => cy.get("#checkout"),
    cartItems: () => cy.get(".cart_item")
  }

  get getTitle() {
    return this.elements.title();
  }

  get getCartProducts() {
    return this.elements.cartItems();
  }

  get getProductsCount() {
    return this.elements.productsCount();
  }

  getProductByName(productName) {
    return this.elements.cartItems().contains(productName).parent().parent().should("have.class", "cart_item");
  }

  clickRemoveButton(product) {
    product.find(".btn.btn_secondary.btn_small.cart_button").click();
  }

  clickCheckoutButton() {
    this.elements.checkoutButton().click();
  }
}

export default new CartPage();