import { DEFAULT_PODCAST_ID, DEFAULT_PODCAST_EPISODE_ID, NON_EXISTENT_EPISODE } from './constants'

describe('Episode page', () => {
    it('page works loading directly', () => {
        cy.visit(`http://localhost:10101/podcast/${DEFAULT_PODCAST_ID}/episode/${DEFAULT_PODCAST_EPISODE_ID}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="podcast-aside"]').should('be.visible')
    })

    it('shows error when loading a non-existent episode', () => {
        cy.visit(`http://localhost:10101/podcast/${DEFAULT_PODCAST_ID}/episode/${NON_EXISTENT_EPISODE}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="error-message"]').should('be.visible')
    })
})