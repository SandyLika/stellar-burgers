import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string) => await forgotPasswordApi({ email })
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => await logoutApi()
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { setUserChecked } = userDataSlice.actions;
export const userReducer = userDataSlice.reducer;