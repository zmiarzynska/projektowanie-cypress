
describe('register to app', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('displays register form after pushing the register button', () => {
        cy.contains('Register').click()

        cy.get('form').should('have.length', 5)
        cy.get('form').should('contain', 'Username')
        cy.get('form').should('contain', 'Password')
        cy.get('form').should('contain', 'Email')
        cy.get('form').should('contain', 'First Name')
        cy.get('form').should('contain', 'Last Name')

    })

    it('redirects to form after submiting register ', () => {

        cy.get('.btn').contains('Register').submit();
        cy.location('pathname', { timeout: 2000 }).should('eq', '/register');

    })

    it('verifies minimal length of an input', () => {
        cy.get('input:invalid').should('have.length', 0)
        cy.get('[type="submit"]').click()
        cy.get('[type="password]').should('have.length', 8)
        cy.get('[type="username]').should('have.length', 6)

    })

    it('returns validation messages after using bad input in password', () => {
        cy.get('[type="username]').should('have.length', 6) //password OK
        cy.get('[type="password"]').type('needs to contain small, great letters and numbers')
        cy.get('input:invalid').should('have.length', 1)
        cy.get('[type="password"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Password needs to contain small letter, great letter and number')
        })

    })

    it('Taken username', () => {
        const user = getExistingUser();

        cy.get('[type="username]').should('eq', user.username)
        cy.get('[type="password"]').should('eq', 'sample password')
        cy.get('[type="username"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('This username is already taken')
        })

    })
})
