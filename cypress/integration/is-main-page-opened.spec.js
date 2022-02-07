describe('routing works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  })

  it('main page opened correctly', function() {
    cy.contains('Соберите бургер')
  })

  it('ingredient modal opened correctly', function() {
    cy.get('#ingredient_bun').click();
    cy.contains('Каллории')
    cy.contains('Углеводы')

    cy.get('#close_modal_btn').click()
  })

  it('add ingredient to constructor', () => {
    const dataTransfer = new DataTransfer();

    cy.get('#ingredient_bun').trigger('dragstart', { dataTransfer });
    cy.get('#drop_target').trigger('drop', { dataTransfer });
    cy.get('#ingredient_item').trigger('dragstart', { dataTransfer });
    cy.get('#drop_target').trigger('drop', { dataTransfer });
  })

  it('is auth neccesary to create new order', function() {
    cy.get('#drop_target').find('button').click()
    cy.contains('Вход')
  })

  it('authorization', function() {
    cy.get('div').find('.input_type_email').as('emailBlock');
    cy.get('@emailBlock').find('.input__icon').click()
    cy.get('[name=email]').type('shabanyan94@yandex.ru')
    cy.get('[name=password]').type('123123')
    cy.get('button').contains('Войти').click()
  })

  it('create new order', function() {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.get('#drop_target').find('button').click().wait(20000)
    cy.contains('Ваш заказ начали готовить')
  })
})