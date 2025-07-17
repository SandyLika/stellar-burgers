import { createSlice, PayloadAction,nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  burgerBun: TIngredient | null;
  burgerIngredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  burgerBun: null,
  burgerIngredients: []
};

const constructorBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.burgerIngredients.push({ ...action.payload });
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid()}
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burgerIngredients = state.burgerIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
      [ state.burgerIngredients[action.payload], 
        state.burgerIngredients[action.payload - 1]
      ] = [
        state.burgerIngredients[action.payload - 1],
        state.burgerIngredients[action.payload] ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      if (action.payload < state.burgerIngredients.length - 1) {
        [ state.burgerIngredients[action.payload],
          state.burgerIngredients[action.payload + 1]
        ] = [
          state.burgerIngredients[action.payload + 1],
          state.burgerIngredients[action.payload] ];
      }
    },
    resetConstructor: () => ({ ...initialState })
}})
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorBurgerSlice.actions;
export const constructorReducer = constructorBurgerSlice.reducer;