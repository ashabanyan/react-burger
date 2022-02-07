describe('routing works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  })

  it('main page opened correctly', function() {
    cy.contains('Соберите бургер')
  })

  it('should open feed page after click on "Лента заказов"', function() {
    cy.get('span').contains('Лента заказов').click();
    cy.contains('Готовы')
    cy.contains('В работе')
  })
})