Cypress.Commands.add('markUnmarkLeaderShipExperience', (flag) => {
    cy.fixture('onboardingStep1.json').then((locators) => {
        if (flag) {
            cy.get(locators.leaderShipCheckBox).check({force:true});
        } else {
            cy.get(locators.leaderShipCheckBox).uncheck({force:true});
        }
    })
})

Cypress.Commands.add('markUnmarkDifferentRole', (flag) => {
    cy.fixture('onboardingStep1.json').then((locators) => {
        if (flag) {
            cy.get(locators.differentRole).check({force:true});
        } else {
            cy.get(locators.differentRole).uncheck({force:true});
        }
    })
})