import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  //const orders: TOrder[] = useSelector((state: RootState) => state.orders.userOrders);
  const { orders, total, totalToday } = useSelector( (state: RootState) => state.feeds);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);
  
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{total, totalToday}}
    />
  );
};
