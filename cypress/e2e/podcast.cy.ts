import { DEFAULT_PODCAST_ID, NON_EXISTENT_PODCAST } from './constants'

describe('Podcast page', () => {
    it('page works loading directly', () => {
        cy.visit(`http://localhost:10101/podcast/${DEFAULT_PODCAST_ID}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="podcast-aside"]').should('be.visible')
    })

    it('shows error when loading a non-existent podcast', () => {
        cy.visit(`http://localhost:10101/podcast/${NON_EXISTENT_PODCAST}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="error-message"]').should('be.visible')
    })
})