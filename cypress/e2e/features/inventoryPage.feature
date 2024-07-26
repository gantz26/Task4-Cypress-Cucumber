Feature: Inventory Page

  Background:
    Given The user is logged in and on the inventory page
  
  Scenario: Logout
    When The user cliks the burger menu
    And The user cliks the logout link
    Then The user is logged out and on the login page
  
  Scenario: Add a product to the cart
    When The user clicks the "Add to cart" button
    And The user click the cart icon
    Then The cart page is opened
    And The added product is displayed
    And The number near the cart icon is increased by 1

  Scenario: Remove a product from the cart
    Given There is the added product in the cart
    When The user click the cart icon
    And The user clicks the "Remove" button
    Then The product is removed

  Scenario: Sorting products
    When The user selects the option <option>
    Then The product are sorted by <option> order

    Examples:
      | option              |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |

  Scenario: Verifying the social media links
    When The user clicks the <social_network> link
    Then The site profile in <social_network> social network is opened

    Examples:
      | social_network |
      | LinkedIn       |
      | Facebook       |
      | X              |