const url = 'http://localhost:4000';
const bun = '[data-cy="1"]';
const ingredient = '[data-cy="3"]';
const modal = '[data-cy="modal"]';
const constructor = '[data-cy="burger-constructor"]';

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    // Устанавливаем токены
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    // Переходим на страницу
    cy.visit(url);
    cy.wait(['@getIngredients', '@getUser']);
  });

  describe('Добавление ингредиентов', () => {
    // Проверяется, что конструктор пуст
     cy.get('[data-cy="burger-constructor"]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="burger-constructor"]').should(
      'not.contain',
      'Хрустящие минеральные кольца'
    );

    // Находим и добавляем первый доступный ингредиент
    cy.get(bun).find('button').click();
    cy.get(ingredient).find('button').click();

    // Проверяем, что ингредиент появился в конструкторе
    cy.get('[data-cy="burger-constructor"]').should(
      'contain.test',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="burger-constructor"]').should(
      'contain.test',
      'Хрустящие минеральные кольца'
    );
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    // Проверяем загрузку ингредиентов
    cy.get(bun).should('exist');
    cy.get(ingredient).should('exist');

    // Открываем модальное окно блочки
    cy.get(bun).click();

    // Проверяем открытие модального окна
    cy.get(modal).should('be.visible');
    cy.contains('Детали ингредиента').should('exist');
    cy.get(modal).should(
      'contain.test', 
      'Краторная булка N-200i'
    );

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close"]').click();
    cy.get(modal).should('not.exist');
  });

  describe('Создание заказа', () => {
    // Проверяется, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');

    // Добавляем ингредиенты
    cy.get(bun).find('button').click();
    cy.get(ingredient).find('button').click();

    // Вызывается клик по кнопке «Оформить заказ».
    cy.contains('Оформить заказ').click();

    // Проверяем номер заказа
    cy.get('[data-cy="order-number"]').should('be.visible');
    cy.get(modal).within(() => {
      cy.get('[data-cy="orderNumber"]').should('contain', '4');
    });

    // Закрывается модальное окно
    cy.get('[data-cy="modal-close"]').click();

    // Проверяется, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });
});
