describe('Add product do shop', () => {
    beforeEach(() => {
        cy.visit('/search-product')
    })

    it('adds product to shop after user click add button', () => {
        //const item = getExistingItem();

        const item = 'Sandals';
        const category = 'Shoes';
        const price = '100';
        const description = 'Those are perfect for sunny days';
        cy.get('input[name="item"]').type(item).should('have.value', item)
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="price"]').type(price).should('have.value', price);
        cy.get('input[name="description"]').type(description).should('have.value', description)

        cy.get('button').contains('Add').click()
        cy.location('pathname').should('eq', '$HOST/add-product?name=sandals')
    })

    it('add item for not logged in user', () => {
        const item = 'Sandals';
        const category = 'Shoes';
        const price = '100';
        const description = 'Those are perfect for sunny days';
        cy.get('input[name="item"]').type(item).should('have.value', item)
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="price"]').type(price).should('have.value', price);
        cy.get('input[name="description"]').type(description).should('have.value', description)

        cy.get('button').contains('Add').click()
        cy.contains('Log in')
        cy.get('button').contains('Log in').click()

        cy.location('pathname').should('eq', '$HOST/login')
        cy.get('[type="submit"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('You must log in before you add products')
        })
    })

    it('User leaves empty price', () => {
        const item = 'Sandals';
        const category = 'Shoes';
        const price = '';
        const description = 'Those are perfect for sunny days';
        cy.get('input[name="item"]').type(item).should('have.value', price)
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="description"]').type(description).should('have.value', description)
        cy.get('button').contains('Add').click()
        cy.get('[type="submit"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Product must have price, at least 1 PLN')
        })

    })

    it('User leaves empty name', () => {
        const item = '';
        const category = 'Shoes';
        const price = '200';
        const description = 'Those are perfect for sunny days';
        cy.get('input[name="item"]').type(item).should('have.value', price)
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="description"]').type(description).should('have.value', description)
        cy.get('button').contains('Add').click()
        cy.get('[type="submit"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Your product must have a name. ')
        })

    })

    it('User leaves too short description', () => {
        const item = 'Sandals';
        const category = 'Shoes';
        const price = '200';
        const description = 'Sun';
        cy.get('input[name="item"]').type(item).should('have.value', price)
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="description"]').type(description).should('have.value', description)
        cy.get('button').contains('Add').click()
        cy.get('[type="submit"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Description of a product is too short. Use at least 15 characters. ')
        })

    })
})
