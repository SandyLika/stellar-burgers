import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;