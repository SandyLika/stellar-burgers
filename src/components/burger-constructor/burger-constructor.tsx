import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCurrentOrder, createOrder } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {

  const { burgerBun, burgerIngredients = [] }=useSelector((state: RootState) =>
    state.constructorBurger)

  const orderRequest = useSelector((state: RootState) => state.orders.loading);

  const orderModalData = useSelector((state: RootState) => state.orders.currentOrder);

  const user = useSelector( (state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const onOrderClick = () => {
    if (!burgerBun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      burgerBun._id,
      ...burgerIngredients.map((ingredient) => ingredient._id),
      burgerBun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>{
      const bunPrice = burgerBun ? burgerBun.price * 2 : 0;
      const ingredientsPrice = burgerIngredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      );
      return bunPrice + ingredientsPrice},
    [burgerBun,burgerIngredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{burgerBun,burgerIngredients}}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
