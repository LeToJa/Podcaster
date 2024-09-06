describe('App navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:10101/')
  })

  it('succesfully loads', () => {
    cy.get('[data-testid="navbar-title"]').contains('Podcaster')
    cy.get('[data-testid="navbar-indicator"]').should('be.visible')
  })

  it('navigation works', () => {
    cy.get('[data-testid="form-label"]').contains(100)
    cy.get('[data-testid="podcast-card"]').first().click()
    cy.get('[data-testid="navbar-indicator"]').should('be.visible')
    cy.get('[data-testid="podcast-aside"]').should('be.visible')
    cy.get('[data-testid="podcast-episode"] a').first().click()
    cy.get('[data-testid="podcast-aside"]').should('be.visible')
  })
})