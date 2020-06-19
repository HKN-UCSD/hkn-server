// / <reference types="Cypress" />

describe('Inductee Sign In', function() {
  it('Logs in and views resume page.', function() {
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

    cy.get('a[href="/resume"]').click();
  });
});
