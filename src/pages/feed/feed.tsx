import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { AppDispatch, RootState } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] =useSelector((state: RootState) => state.feeds.orders);
  const isLoading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchFeeds())}} />;
};
