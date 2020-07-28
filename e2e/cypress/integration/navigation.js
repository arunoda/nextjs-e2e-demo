describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3004')
        cy.exec('curl http://localhost:3004/api/reset-db')
        cy.wait(2000)
        cy.visit('http://localhost:3004')
        cy.wait(1000)
        cy.visit('http://localhost:3004')
    })
    
    it('should open the homepage', () => {  
        cy.contains('Introducing GetStarted')
    })

    it('should go to the post page', () => {
        cy.get('a').contains('Hello World').click()
        cy.contains('Amazing 🚀 🚀')
    })

    it('should allow to login', () => {
        cy.get('a').contains('Login').click()
    })
})