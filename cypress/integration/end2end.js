import { onboarding } from '../support/onboarding.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

let TEST_USER = 'registeredUser';

describe('End To End Test', () => {
    before(() => {
        cy.visit('');
        Cypress.Cookies.preserveOnce('session_id', 'remember_token');
    })

    it('Test onboarding process for a registered user', () => {

        //Login into app with the user provided
        cy.fixture('users.json').then((users) => {
            cy.login(users.registeredUser, users.registeredUserPassword);
        })

        //Test the first screen of the onboarding section
        cy.fixture('onboardingStep1.json').then((locators) => {
            cy.get(locators.hearFrom).click();
            cy.get(locators.hearFromValues)
                .should('contain', 'Youtube')
                .should('contain', 'Linkedin');
            cy.get(locators.Linkedin).click();
            cy.get(locators.continueWithout).click();

            //Test Professional Details screen 
            cy.get(locators.profesionalDetailsTitle)
                .should('contain', 'PROFESSIONAL DETAILS');
            cy.markUnmarkLeaderShipExperience(true);
            cy.get(locators.yearsOfExperienceDropdown)
                .should('be.visible');
            cy.markUnmarkDifferentRole(true)
            cy.get(locators.differentRoleDropdown)
                .should('be.visible')

            //Test Mandatory Fields
            cy.get(locators.nextBtn).click();
            cy.get(locators.toast).should('be.visible');

            //Select a role and years of experience test boundary values
            cy.get(locators.role).click();
            cy.get(locators.listValues)
                .should('contain', 'Backend Engineer')
                .should('contain', 'Solutions Architect');
            cy.get(locators.qaEngineer).click();
            cy.get(locators.yearsOfExperienceDropdown).click();
            cy.get(locators.listValues)
                .should('contain', '1 year')
                .should('contain', '10+ years');
            cy.get(locators.xpfiveYears).click();

            //Set leadership years of experience and willingness to work on a differente role test boundary values
            cy.get(locators.leaderShipYears).click();
            cy.get(locators.leadValues)
                .should('contain', '1 year')
                .should('contain', '10+ years');
            cy.get(locators.leadTwoYears).click();
            cy.get(locators.differentRoleDropdown).click();
            cy.get(locators.rolesValues)
                .should('contain', 'Backend Engineer')
                .should('contain', 'Solutions Architect');
            cy.get(locators.backEnd).click();

            //Test redirection to step 2
            cy.get(locators.nextBtn).click();
        })
        cy.fixture('onboardingStep2.json').then((locators) => {
            cy.get(locators.step)
                .should('contain', '2 / 4');

            //Test Mandatory Fields
            cy.clickIfExist('#pushActionRefuse');
            cy.get(locators.nextBtn).click();
            cy.get(locators.toast).should('be.visible');

            //Set top and secondary skills plus years of experience
            cy.get(locators.first).first().click().type('java');
            cy.get(locators.fistDropdown).should('contain', 'java').first().click();
            cy.get(locators.firstYears).first().click();
            cy.get(locators.firstYearsDropdown).click();
            cy.get(locators.firstYears).first().should('contain', '8 years');

            cy.get(locators.second).first().click().type('java');
            cy.get(locators.secondDropdown).should('not.contain', 'java').first().click();
            cy.get(locators.second).first().click().type('python');
            cy.get(locators.secondDropdown).should('contain', 'python').first().click();
            cy.get(locators.secondYears).first().click();
            cy.get(locators.secondYearsDropdown).click();
            cy.get(locators.secondYears).first().should('contain', '7 years');

            cy.get(locators.third).first().click().type('javascript');
            cy.get(locators.thirdDropdown).should('contain', 'javascript').first().click();
            cy.get(locators.thirdYears).first().click();
            cy.get(locators.thirdYearsDropdown).click();
            cy.get(locators.thirdYears).first().should('contain', '6 years');

            cy.get(locators.firstSecondaryYears).first().click();
            cy.get(locators.firstSecondaryYearsDropdown).click();
            cy.get(locators.firstSecondaryYears).first().should('contain', '5 years');
            cy.get(locators.firstSecondary).first().click().type('Cypress');
            cy.get(locators.firstSecondaryDropdown).should('contain', 'Cypress').first().click();

            cy.get(locators.nextBtn).click();
        })

    })


})