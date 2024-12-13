import { TodoStatus } from '../../store/todos';

const TEST_TODO_TITLE = 'do something';

describe('Todos.', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[name="todoTitle"]').type(TEST_TODO_TITLE);
    cy.get('form').submit();
  });

  it('Should added todo.', () => {
    cy.get('ul').children('li').contains(TEST_TODO_TITLE);
    cy.contains('Todo was successfully added!').should('be.visible');
  });

  it('Should change status.', () => {
    cy.get('li')
      .as('TestTodoItem')
      .children(
        `[aria-label='Mark todo "${TEST_TODO_TITLE}" as ${TodoStatus.COMPLETED}']`
      )
      .as('MarkAsCompletedButton')
      .should('exist');

    cy.get('@MarkAsCompletedButton').click();

    cy.get('@TestTodoItem')
      .children(
        `[aria-label='Mark todo "${TEST_TODO_TITLE}" as ${TodoStatus.ACTIVE}']`
      )
      .as('MarkAsActiveButton')
      .should('exist');

    cy.get('@MarkAsActiveButton').click();

    cy.get('@MarkAsActiveButton').should('not.exist');
  });

  it('Should clear completed.', () => {
    cy.get('[name="todoTitle"]').type(`${TEST_TODO_TITLE} 2`);
    cy.get('form').submit();
    cy.get('[name="todoTitle"]').type(`${TEST_TODO_TITLE} 3`);
    cy.get('form').submit();

    cy.get('ul')
      .children('li')
      .contains(TEST_TODO_TITLE)
      .parent('li')
      .as('Todo1');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 2`)
      .parent('li')
      .as('Todo2');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 3`)
      .parent('li')
      .as('Todo3');

    cy.get('@Todo2').children('button').click();
    cy.get('@Todo3').children('button').click();

    cy.get('button').contains('Clear completed').click();

    cy.get('@Todo1').should('exist');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 2`)
      .should('not.exist');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 3`)
      .should('not.exist');
  });

  it('Should filter by status.', () => {
    cy.get('[name="todoTitle"]').type(`${TEST_TODO_TITLE} 2`);
    cy.get('form').submit();
    cy.get('[name="todoTitle"]').type(`${TEST_TODO_TITLE} 3`);
    cy.get('form').submit();

    cy.get('ul')
      .children('li')
      .contains(TEST_TODO_TITLE)
      .parent('li')
      .as('Todo1');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 2`)
      .parent('li')
      .as('Todo2');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 3`)
      .parent('li')
      .as('Todo3');

    cy.get('@Todo2').children('button').click();
    cy.get('@Todo3').children('button').click();

    cy.get('button').contains('Active').click();

    cy.get('@Todo1').should('exist');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 2`)
      .should('not.exist');
    cy.get('ul')
      .children('li')
      .contains(`${TEST_TODO_TITLE} 3`)
      .should('not.exist');
    cy.get('ul').children('li').should('have.length', 1);

    cy.get('button').contains('Completed').click();

    cy.get('@Todo2').should('exist');
    cy.get('@Todo3').should('exist');
    cy.get('ul').children('li').should('have.length', 2);
  });

  it('Should restore list after page reload.', () => {
    cy.reload();
    cy.get('ul').children('li').should('have.length', 1);
  });
});
