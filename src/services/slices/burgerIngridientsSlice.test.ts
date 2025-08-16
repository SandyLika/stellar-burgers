import {
  fetchIngredients,
  ingredientsReducer,
  initialState
} from './burgerIngridientsSlise';

describe('Проверка ingredientsReducer', () => {
  it('Тест возвращает начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  it('fetchIngredients.fulfilled', () => {
    const state = [
      {
        _id: '4',
        name: 'Булка',
        type: 'bun',
        proteins: 8,
        fat: 16,
        carbohydrates: 32,
        calories: 64,
        price: 128,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: state 
    };

    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      items: state,
      isLoading: false,
      error: null
    });
  });

  it('fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      items: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
