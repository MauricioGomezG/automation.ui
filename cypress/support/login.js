Cypress.Commands.add('login', (user, pass) => {
    cy.fixture('login.json').then((locators) => {
        cy.get(locators.modalBtn).click();
        cy.get(locators.email).type(user);
        cy.get(locators.password).type(pass);
        cy.get(locators.loginBtn).click();
    })
})