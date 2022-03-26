/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://testomate-test.web.app/home')
    })
  
    
    it('Create a restaurant', () => {
        cy.contains('Create new').click()
        cy.get('#id').clear().type(690)
        cy.get('#name').clear().type('ronengotliv')
        cy.get('#address').clear().type('stock city')
        cy.get('#score').clear().type(1.2)
        cy.get('.btn').click()
        cy.get('#alert-popup').should('have.text','Created!OK')

    })
    it('validate restaurant throuw api', () => {
      cy.request({
            method:'GET',
            url:'https://us-central1-testomate-test.cloudfunctions.net/api/restaurants'
        }).then(api=>{
        expect(api.status).to.eq(200)
        expect(api.body.data).to.have.lengthOf.above(0)
        })

    })
    it.only('Validate the restaurant list', () => {
        cy.get('[id="main-table"]')
        .find('tr')
        .its('length')
        .should('be.gte',1)
      })   
    it('Delete a restaurant', () => {
        cy.get('.table.table-striped')
        .contains('td','ronengotliv')
        .siblings()
        .eq(4)
        .children()
        .click()
        cy.get('#alert-popup').should('have.text','Deleted!OK')
        // .click({force})

    })
})