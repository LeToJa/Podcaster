import { DEFAULT_PODCAST_ID } from './constants'

describe('Podcast page', () => {
    it('page works using normal navigation', () => {
        cy.visit('http://localhost:10101/')

        cy.get('[data-testid="form-label"]').contains(100)
        cy.get('[data-testid="podcast-card"]').first().click()
        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="podcast-aside"]').should('be.visible')
    })

    it('page works loading directly', () => {
        cy.visit(`http://localhost:10101/podcast/${DEFAULT_PODCAST_ID}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="podcast-aside"]').should('be.visible')
    })
})