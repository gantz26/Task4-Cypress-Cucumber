Feature: Login page
  
  Background:
    Given The user is on the login page

  Scenario: Login with different credentials
    When The user enters "<username>" into the username field
    And The user enters "<password>" into the password field
    And The user clicks the "Login" button on the login page
    Then The user <result> and the <message> is displayed

    Examples:
      | username            | password            | result           | message                                                                   |
      | standard_user       | secret_sauce        | is logged in     | inventory page                                                            |
      | locked_out_user     | secret_sauce        | is not logged in | Epic sadface: Sorry, this user has been locked out.                       |
      |                     | secret_sauce        | is not logged in | Epic sadface: Username is required                                        |
      | standard_user       |                     | is not logged in | Epic sadface: Password is required                                        |
      | an invalid username | secret_sauce        | is not logged in | Epic sadface: Username and password do not match any user in this service |
      | standard_user       | an invalid password | is not logged in | Epic sadface: Username and password do not match any user in this service |