const url = "http://localhost:3000/";

describe('Check Local API', () => {
    //Visit The URL and Check Table if it has Data
    it('Test Login', () => {
        cy.visit(url);
        //Assert Url
        cy.url().should('eq', url);

        cy.get('#txtEmail').type('angelien.gomez@ctu.edu.ph');
        cy.get('#txtEmail').should('have.value', 'angelien.gomez@ctu.edu.ph');
        cy.get('#txtPassword').type('MyPassword');
        cy.get('#txtPassword').should('have.value', 'MyPassword');

        cy.get("#LoginBtn").click();
        cy.url().should('eq', url + 'Home');
    });
});