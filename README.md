# Summary

This repository contains automated tests for verifying login, actions with products, social links and checkout on the [Swag Labs](https://www.saucedemo.com/) website.

# Requirements

1. Install [Visual Studio code](https://code.visualstudio.com/)
2. Install [Node.js](https://nodejs.org/en)
3. Sign up on [Cloud Cypress](https://cloud.cypress.io/)

# Steps to install, launch and creating a report

1. Copy the repository
```
git clone https://github.com/gantz26/Task4-Cypress-Cucumber.git
```

2. Open this folder in Visual Studio Code and install all dependencies
```
npm ci
```

3. Run the tests with one of the next commands
```
// To run tests in Cypress app
npm run cy:open:default
npm run cy:open:different

// To run tests in terminal
npm run cy:run:default:chrome
npm run cy:run:different:electron
```

4. To record results to the Cloud ID account
    - Open Cypress app and connect the project
    - Copy the record key in the project settings
    - Replace the $KEY with your key in package.json
    - Run the tests with the one of the next commands
        ```
        npm run cy:run:record:default:chrome
        ```
    - Click the link to view the report