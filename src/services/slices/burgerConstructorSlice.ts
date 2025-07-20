import { createSlice, PayloadAction,nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,  
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid()}
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
      [ state.ingredients[action.payload], 
        state.ingredients[action.payload - 1]
      ] = [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload] ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      if (action.payload < state.ingredients.length - 1) {
        [ state.ingredients[action.payload],
          state.ingredients[action.payload + 1]
        ] = [
          state.ingredients[action.payload + 1],
          state.ingredients[action.payload] ];
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