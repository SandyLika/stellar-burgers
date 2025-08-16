import { fetchFeeds, feedReducer, initialState } from './feedSlice';

describe('Проверка feedReducer', () => {
  it('Тест возвращает начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const result = feedReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('fetchFeeds.fulfilled', () => {
    const state = {
      orders: [{ _id: '2', name: 'Заказ 4' }],
      total: 256,
      totalToday: 512
    };

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: state
    };

    const result = feedReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      orders: state.orders,
      total: state.total,
      totalToday: state.totalToday,
      loading: false,
      error: null
    });
  });

  it('fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const result = feedReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки'
    });
  });
});
