import { rootReducer } from './store';
import { initialState as userInitialState } from './slices/userDataSlice';
import { initialState as ingredientsInitialState } from './slices/burgerIngridientsSlise';
import { initialState as ordersInitialState } from './slices/orderSlice';
import { initialState as feedsInitialState } from './slices/feedSlice';
import { initialState as constructorInitialState } from './slices/burgerConstructorSlice';

describe('Тестирование rootReducer', () => {
  it('Возвращает начальное состояние и содержит необходимые редюсеры', () => {
    const testInitialState = {
      user: userInitialState,
      ingredients: ingredientsInitialState,
      orders: ordersInitialState,
      feeds: feedsInitialState,
      constructorBurger: constructorInitialState
    };
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(testInitialState);

    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('constructorBurger');
  });
});
