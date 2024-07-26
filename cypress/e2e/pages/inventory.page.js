/// <reference types="cypress" />

class InventoryPage {
  elements = {
    title: () => cy.get(".title"),
    burgerMenu: () => cy.get("#react-burger-menu-btn"),
    logoutLink: () => cy.get("#logout_sidebar_link"),
    inventoryItems: () => cy.get(".inventory_item"),
    productsCount: () => cy.get(".shopping_cart_badge"),
    cartIcon: () => cy.get(".shopping_cart_link"),
    sortDropList: () => cy.get(".product_sort_container"),
    XLink: () => cy.get('a[data-test="social-twitter"]'),
    facebookLink: () => cy.get('a[data-test="social-facebook"]'),
    linkedIn: () => cy.get('a[data-test="social-linkedin"]')
  }

  get getTitle() {
    return this.elements.title();
  }
  
  get getProductsCount() {
    return this.elements.productsCount();
  }

  get getProducts() {
    return this.elements.inventoryItems();
  }

  get getOneOfProducts() {
    return this.elements.inventoryItems().then($products => {
      const index = Math.floor((Math.random() * $products.length));
      return cy.wrap($products[index]);
    })
  }
    
  get getXLink() {
    return this.elements.XLink().invoke("attr", "href");
  }

  get getFacebookLink() {
    return this.elements.facebookLink().invoke("attr", "href");
  }

  get getLinkedInLink() {
    return this.elements.linkedIn().invoke("attr", "href");
  }

  getProductName(product) {
    return product.find(".inventory_item_name");
  }

  getProductPrice(product) {
    return product.find(".inventory_item_price");
  }

  getProductAddButton(product) {
    return product.find(".btn.btn_primary.btn_small.btn_inventory ");
  }

  clickBurgerMenu() {
    this.elements.burgerMenu().click();
  }

  clickLogoutLink() {
    this.elements.logoutLink().click();
  }

  clickCartIcon() {
    this.elements.cartIcon().click();
  }

  selectSortOption(option) {
    this.elements.sortDropList().select(option);
  }
}

export default new InventoryPage();