import {
  userReducer,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  fetchUser,
  initialState
} from './userDataSlice';

describe('Тесты UserDataReducer', () => {
  it('register.pending', () => {
    const state = userReducer(
      initialState,
      registerUser.pending('pending', { email: '', password: '', name: '' })
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('register.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: { email: 'new@mail.ru', name: 'New' },
        success: true
      }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(action.payload.user);
  });

  it('register.rejected', () => {
    const action = {
          type: registerUser.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('login.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('login.fulfilled', () => {
    const payload = {
      user: { email: 'test@yandex.ru', name: 'TestUser' }
    };
    const action = { type: loginUser.fulfilled.type, payload };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(payload.user);
    expect(state.loading).toBe(false);
  });

  it('login.rejected', () => {
    const action = {
          type: loginUser.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchUser.fulfilled', () => {
    // const orders = [{ number: '123' }, { number: '456' }];
    // const action = { type: fetchUser.fulfilled.type, payload: orders };
    // const state = userReducer(initialState, action);
    // expect(state.user).toEqual(orders);
     const previousState = {
        ...initialState,
        loading: true
      };

      const state = userReducer(
        previousState,
        fetchUser.fulfilled(
          { success: true,user: { email: 'test@yandex.ru', name: 'TestUser' } },
          'fulfilled',
          undefined
        )
      );

      expect(state).toEqual({
        ...initialState,
        user: { email: 'test@yandex.ru', name: 'TestUser' },
        loading: false,
        error: null
      });
  });

  it('fetchUser.rejected', () => {
    const action = {
          type: fetchUser.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('updataUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('updateUser.fulfilled', () => {
    const updatedUser = { email: 'update@yandex.ru', name: 'UpdatedName' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser, success: true }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: updatedUser,
      loading: false,
      error: null
    });
  });

  it('updataUser.rejected', () => {
    const action = {
          type: updateUser.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('logout.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(
      {
        ...initialState,
        user: { email: 'user@mail.ru', name: 'User' }
      },
      action
    );
    // expect(state.user).toEqual({ email: '', name: '' });
    // expect(state.loading).toBe(false);
    expect(state).toEqual({
        ...initialState,
        user: null,
        loading: false,
        error: null
      });
  });

  it('logoutUser.rejected', () => {
    const action = {
          type: logoutUser.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = userReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });
});
