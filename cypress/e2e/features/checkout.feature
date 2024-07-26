Feature: Checkout

  Background:
    Given The user is logged in and on the inventory page
    And There is the added product in the cart
    And The user click the cart icon

  Scenario: Checkout
    When The user clicks the "Checkout" button
    And The users enters "<First Name>" into "First name" field
    And The users enters "<Last Name>" into "Last name" field
    And The users enters "<Zip Code>" into "Zip/Postal Code" field
    And The users clicks the "Continue" button on the checkout page
    And The users clicks the "Finish" button on the checkout page
    Then The checkout is completed and the successful order message is displayed

    Examples:
      | First Name      | Last Name       | Zip Code        |
      | any valid value | Any valid value | Any valid value |

  Scenario: Checkout with missing fields
    When The user clicks the "Checkout" button
    And The users enters "<First Name>" into "First name" field
    And The users enters "<Last Name>" into "Last name" field
    And The users enters "<Zip Code>" into "Zip/Postal Code" field
    And The users clicks the "Continue" button on the checkout page
    Then The <error message> error message is displayed

    Examples:
      | First Name      | Last Name       | Zip Code        | error message                  |
      |                 | Any valid value | Any valid value | Error: First Name is required  |
      | Any valid value |                 | Any valid value | Error: Last Name is required   |
      | Any valid value | Any valid value |                 | Error: Postal Code is required |