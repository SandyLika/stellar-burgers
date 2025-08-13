import {
  addIngredient,
  constructorReducer,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  resetConstructor
} from './burgerConstructorSlice';

describe('Проверка constructorReducer', () => {
  const testIngredient = {
    _id: 'ing128',
    name: 'Test Ing',
    type: 'sauce' as const,
    proteins: 16,
    fat: 8,
    carbohydrates: 32,
    calories: 128,
    price: 64,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
    id:'ing128'
  };

  const testBun = {
    _id: 'bun128',
    name: 'Test Bun',
    type: 'bun' as const,
    proteins: 5,
    fat: 3,
    carbohydrates: 20,
    calories: 150,
    price: 80,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
    id:'bun128'
  };

    it('ingridient', () => {

      const state = constructorReducer(
        initialState,
        addIngredient(testIngredient)
      );
      expect(state.ingredients).toHaveLength(1);

    });
    it('bun', () => {

      const state = constructorReducer(
        initialState,
        addIngredient(testBun)
      );
      expect(state.bun?.type).toBe("bun");
    });

  it('removeIngredient', () => {
    const state = {
      ...initialState,
      ingredients: [testIngredient]
    };

    const action = removeIngredient(testIngredient.id);
    const result = constructorReducer(state, action);
    expect(result.ingredients.length).toBe(0);
  });

  it('moveIngredientUp', () => {
    const second = { ...testIngredient, id: '2', name: 'Second' };
    const third = { ...testIngredient, id: '3', name: 'Third' };

    const state = {
      ...initialState,
      ingredients: [testIngredient, second, third]
    };

    const result = constructorReducer(state, moveIngredientUp(3));
    expect(result.ingredients[1].id).toBe("2");
  });

  it('moveIngredientDown', () => {
    const first = { ...testIngredient, id: '1', name: 'First' };
    const second = { ...testIngredient, id: '2', name: 'Second' };

    const state = {
      ...initialState,
      ingredients: [first, second]
    };

    const result = constructorReducer(state, moveIngredientDown(1));
    expect(result.ingredients[1].id).toBe("2");
  });

  it('resetConstructor', () => {
    const state = {
      bun: testBun,
      ingredients: [testIngredient]
    };

    const result = constructorReducer(state, resetConstructor());
    expect(result.bun).toBeNull();
    expect(result.ingredients.length).toBe(0);
  });
});
