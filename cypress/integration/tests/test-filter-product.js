describe('Filter products on page ', () => {
    beforeEach(() => {
        cy.visit('/filter-product')
    })

    it('displays all products from given category', () => {
        const category = 'Shoes';
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('[data-cy="search"]').type(category).should('have.value', category);

        cy.get('button').contains('Filter').click()
        cy.get('li:contains("High-heels")').should('exist')
        cy.get('li:contains("Sandals")').should('exist')
        cy.get('li:contains("Dress")').should('not.exist')

        cy.location('pathname', {timeout: 10000}).should('eq', '/filtered');

    });

    it('displays nothing when non-existing category', () => {
        const category = '%FDF23';
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('[data-cy="search"]').type(category).should('have.value', category);

        cy.get('button').contains('Filter').click()

        cy.get('result').should('have.length', 0)
        cy.get('li:contains("Sandals")').should('not.exist')
        cy.get('li:contains("Dress")').should('not.exist')

        cy.location('pathname', {timeout: 10000}).should('eq', '/filtered');
        cy.get('[type="submit"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Possible categories for search are: Shoes, Clothes')
        })
    });

    it('displays products with given price range', () => {
        const minPrice = 1;
        const maxPrice = 1000000;
        const minTimeRange = 20;
        const maxTimeRange = 100;
        const category = 'Shoes';

        cy.get('input[name="price"]').type(minTimeRange).should('have.value', minTimeRange);
        cy.get('input[name="price"]').type(maxTimeRange).should('have.value', maxTimeRange);
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('button').contains('Filter').click()
        cy.get('input[name="price"]').type(minPrice).should('be.gte', minPrice);
        cy.get('input[name="price"]').type(maxPrice).should('be.lte', maxPrice);

        cy.location('pathname', {timeout: 10000}).should('eq', '/filtered-products');

    });

    it('displays products with newest release date', () => {

        const minDate = '20-06-2021';
        const maxDate = '01-06-2021';
        const category = 'Shoes';

        cy.get('input[name="date"]').type(minDate).should('have.value', minDate);
        cy.get('input[name="date"]').type(minDate).should('have.value', maxDate);
        cy.get('input[name="category"]').type(category).should('have.value', category);
        cy.get('button').contains('Filter').click()
        cy.get('date').type(minDate).should('be.gte', minDate);
        cy.get('date').type(minDate).should('be.lte', maxDate);

        cy.location('pathname', {timeout: 10000}).should('eq', '/filtered-products');

    });

    it('displays products with with shipment abroad', () => {

        const category = 'Shoes';
        const itemAbroad = 'abroadSandals';
        const item = 'sandals';
        const shipmentType = 'abroad';

        cy.get('input[name="shipment"]').type(shipmentType).should('have.value', shipmentType);
        cy.get('button').contains('Filter').click()
        cy.get('input[name="category"]').type(category).should('have.value', category);

        cy.location('pathname', {timeout: 10000}).should('eq', '/filtered-products');
        cy.get(itemAbroad).should('exist')
        cy.get(item).should('not.exist')


    });
})
