import {
  createOrder,
  fetchOrderByNumber,
  fetchUserOrders,
  initialState,
  orderReducer
} from './orderSlice';

describe('Тесты orderReduser', () => {
  it('createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('createOrder.fulfilled', () => {
    const newOrder = { order: { number: '789' } };
    const action = { type: createOrder.fulfilled.type, payload: newOrder };
    const state = orderReducer(initialState, action);
    expect(state.currentOrder).toEqual(newOrder.order);
  });

  it('createOrder.rejected', () => {
    const action = {
          type: createOrder.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = orderReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchUserOrders.fulfilled', () => {
    const orders = [{ number: '123' }, { number: '456' }];
    const action = { type: fetchUserOrders.fulfilled.type, payload: orders };
    const state = orderReducer(initialState, action);
    expect(state.userOrders).toEqual(orders);
  });

  it('fetchUserOrders.rejected', () => {
    const action = {
          type: fetchUserOrders.rejected.type,
          error: { message: 'Ошибка загрузки' }
        };
        const result = orderReducer(initialState, action);
        expect(result).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка загрузки'
        });
  });

  it('fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchOrderByNumber.fulfilled', () => {
    const order = { _id: '512', name: 'Заказ 1024' };

    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    };

    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(order);
  });

  it('fetchOrderByNumber.rejected', () => {
   const action = {
         type: fetchOrderByNumber.rejected.type,
         error: { message: 'Ошибка загрузки' }
       };
       const result = orderReducer(initialState, action);
       expect(result).toEqual({
         ...initialState,
         loading: false,
         error: 'Ошибка загрузки'
       });
  });
});
