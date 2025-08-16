import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { userReducer } from './slices/userDataSlice';
import { ingredientsReducer } from './slices/burgerIngridientsSlise';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { constructorReducer } from './slices/burgerConstructorSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: orderReducer,
  feeds: feedReducer,
  constructorBurger: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
