describe('search for a product', () => {
    beforeEach(() => {
        cy.visit('/product-search')
    })

    it('displays existing product type when entered existing product name and submit', () => {
        cy.get('[type="item"]').type('item').should('have.value', 'item')
        cy.get('button').contains('Search').click()
        cy.get('div.items').should('have.text', "item")
    })

    it('displays additional info when similar product is found', () => {
        const item = 'Sandals';
        const item2 = 'Sandals2';

        const category = 'Shoes';
        const quantity = 1;
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('input[name="item"]').type(item).should('have.value', item);
        cy.get('input[name="quantity"]').type(quantity).should('have.value', quantity);

        cy.get('button').contains('Search').click()
        cy.get('div.items').should('have.text', item)
        cy.get('[type="item"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Quantity of item is low. Similar products are: ' + item2)


        })

        it('displays max 5 items in a row and 2 min ', () => {

            cy.get('row').should('be.gte', 2)
            cy.get('row').should('be.lte', 5)
            cy.get('body').contains('pagination')


        })

        it('contains mandatory fields for search ', () => {

            cy.get('.btn').contains('Search').submit();
            cy.get('.btn').contains('Search-bar')


        })


        it('Display communicat when no item was found', () => {
            const item = searchForItem();

            cy.get('form').should('contain', 'item')
            cy.get('[type="item"]').then(($input) => {
                expect($input[0].validationMessage).to.eq('This item is not found')
            })

        })


    })
})
