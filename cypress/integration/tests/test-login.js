
describe('login to app', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('displays login form after pushing the login button', () => {
        cy.contains('Login').click()

        cy.get('form').should('have.length', 2)
        cy.get('form').should('contain', 'Username')
        cy.get('form').should('contain', 'Password')
    })

    it('redirects to form after submiting login ', () => {

        cy.get('.btn').contains('Login').submit();
        cy.location('pathname', { timeout: 2000 }).should('eq', '/login');

    })

    it('returns validation messages after login nonexisting user', () => {
        const user = getNotExistingUser();
            cy.get('input:invalid').should('have.length', 0)
            cy.get('[type="submit"]').click()
            cy.get('[type="password]').should('eq', user.password)
            cy.get('[type="username]').should('eq', user.username)
            cy.get('[type="submit"]').then(($input) => {
                expect($input[0].validationMessage).to.eq('Given user does not exist')
            })
        })

    it('returns validation messages after using bad input in password', () => {
        cy.get('[type="username]').should('have.length', 6) //password OK
        cy.get('[type="password"]').type('needs to contain small, great letters and numbers')
        cy.get('input:invalid').should('have.length', 1)
        cy.get('[type="password"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Password needs to contain small letter, great letter and number')
        })

    })

    it('bad password', () => {
        const user_credentials = User.getById();
        cy.get('[type="username]').should('eq', user_credentials.username) //username OK
        cy.get('[type="password"]').type('wrong password')
        cy.get('[type="password"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Wrong password')
        })
        cy.url()
            .should('contain', '/login')

    })
    })
