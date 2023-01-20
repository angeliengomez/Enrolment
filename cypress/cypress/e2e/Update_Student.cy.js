const url = "http://localhost:3000/StudentList";

describe('Check Local API', () => {
    //Visit The URL and Check Table if it has Data
    it('Test Data Insert', () => {
        cy.visit(url);
        //Assert Url
        cy.url().should('eq', url);

        cy.get('#StudTable').should('length', 1);


        cy.get('#StudTable > tr').last().find('td').last().find('button').first().click();

        cy.get('#StudTable > tr').last().find('td').first().find('input').first().should('have.value', 'Anne');
        cy.get('#StudTable > tr').last().find('td').first().find('input').first().type('y');
        cy.get('#StudTable > tr').last().find('td').first().find('input').first().should('have.value','Anney');

        cy.get('#StudTable > tr').last().find('td').eq(1).find('input').first().should('have.value', 'Curtis');
        cy.get('#StudTable > tr').last().find('td').eq(1).find('input').first().type('Smith');
        cy.get('#StudTable > tr').last().find('td').eq(1).find('input').first().should('have.value','CurtisSmith');

        
        cy.get('#StudTable > tr').last().find('td').last().find('button').first().click();
        cy.wait(2000);
        cy.get('#StudTable > tr').last().find('td').first().find('span').first().should('have.text', 'Anney');
        cy.get('#StudTable > tr').last().find('td').eq(1).find('span').first().should('have.text', 'CurtisSmith');

    });
});