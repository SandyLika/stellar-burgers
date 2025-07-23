import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.userOrders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
