import { DEFAULT_PODCAST_ID, DEFAULT_PODCAST_EPISODE_ID } from './constants'

describe('Episode page', () => {
    it('page works loading directly', () => {
        cy.visit(`http://localhost:10101/podcast/${DEFAULT_PODCAST_ID}/episode/${DEFAULT_PODCAST_EPISODE_ID}`)

        cy.get('[data-testid="navbar-indicator"]').should('be.visible')
        cy.get('[data-testid="podcast-aside"]').should('be.visible')
    })
})