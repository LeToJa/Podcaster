import { DEFAULT_PODCAST_NAME } from './constants'

describe('Home page', () => {
    it('page works', () => {
        cy.visit('http://localhost:10101/')

        cy.get('[data-testid="form-label"]').contains(100)
        cy.get('[data-testid="form-input"]').type(DEFAULT_PODCAST_NAME)
        cy.get('[data-testid="form-label"]').contains(1)
    })
})