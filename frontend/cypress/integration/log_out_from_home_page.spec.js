// / <reference types="Cypress" />

describe('Inductee Sign In', function() {
  it('Logs in and then logs out.', function() {
    cy.visit('http://localhost:3000', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
      },
    });

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/login');

    // Get an input, type into it and verify that the value has been updated
    cy.get('#email')
      .type(Cypress.env('EMAIL'))
      .should('have.value', Cypress.env('EMAIL'));

    cy.get('#password').type(Cypress.env('PASSWORD'));

    cy.contains('Sign in').click();

    cy.url().should('include', '/');

    // Click on log out button on navbar to open
    cy.contains('Logout').click();

    // Click on the 'yes' option on the logout pop-up
    cy.contains('Yes').click();

    cy.url().should('include', '/login');
  });
});
