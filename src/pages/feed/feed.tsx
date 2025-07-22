import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { AppDispatch, RootState } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.feeds.orders
  );
  //const isLoading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
