import { RootState } from '../store';

export function orderSelectorByNumber(numberOrder: number) {
  return (store: RootState) => {
    if (store.feeds.orders.length) {
      return store.feeds.orders.find((order) => order.number === numberOrder);
    }

    if (store.orders.userOrders.length) {
      return store.orders.userOrders.find(
        (order) => order.number === numberOrder
      );
    }

    if (store.orders.currentOrder) {
      return store.orders.currentOrder;
    }

    return null;
  };
}
