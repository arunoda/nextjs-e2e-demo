describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3004')
        cy.exec('curl http://localhost:3004/api/reset-db')
        cy.reload()
        cy.reload()
    })
    
    it('should be able to add comment', () => {  
        cy.contains('Introducing GetStarted').click()
        cy.contains('Show Comments').click()
        cy.contains('Login to Add Comment').click()
        
        const username = String(Math.random())
        const commentText = String(Math.random())

        cy.get('#input-username-for-credentials-provider').type(username)
        cy.contains('test-auth').click()
        cy.contains('Show Comments').click()
        cy.get('textarea').type(commentText)

        cy.contains('Add Comment').click()

        cy.get('.comment-content').contains(commentText)
        cy.get('.comment-author').contains(username)

        cy.get('a').contains('Logout').click()

        const username2 = String(Math.random())
        const commentText2 = String(Math.random())

        cy.contains('Show Comments').click()
        cy.contains('Login to Add Comment').click()

        cy.get('#input-username-for-credentials-provider').type(username2)
        cy.contains('test-auth').click()
        cy.contains('Show Comments').click()
        cy.get('textarea').type(commentText2)
        cy.contains('Add Comment').click()

        cy.get('.comment-content').contains(commentText2)
        cy.get('.comment-author').contains(username2)
    })
})