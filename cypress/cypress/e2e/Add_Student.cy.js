const url = "http://localhost:3000/StudentList";

describe('Check Local API', () => {
    //Visit The URL and Check Table if it has Data
    it('Test Data Insert', () => {
        cy.visit(url);
        //Assert Url
        cy.url().should('eq', url);

        cy.get('#StudTable').should('length', 1);


        cy.get('#FirstName').type('Anne');
        cy.get('#FirstName').should('have.value', 'Anne');
        cy.get('#LastName').type('Curtis');
        cy.get('#LastName').should('have.value', 'Curtis');

        cy.get('#AddStudentBtn').click();
        
        cy.wait(2000);

        cy.get('#FirstName').should('be.empty');
        cy.get('#LastName').should('be.empty');

        cy.get('#StudTable > tr').last().find('td').first().find('span').first().should('have.text', 'Anne');

        
    });
});