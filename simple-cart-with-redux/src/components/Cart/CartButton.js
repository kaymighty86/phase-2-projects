import classes from './CartButton.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const CartButton = (props) => {
  const cartItems = useSelector(store => store.cart.items);

  const dispatchCartAction = useDispatch();

  function handleToggleCartVisibiliy(){
    dispatchCartAction(cartActions.toggleCartVisibility());
  }

  return (
    <button className={classes.button} onClick={handleToggleCartVisibiliy}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.reduce((acc,item)=> (item.quantity + acc), 0)}</span>
    </button>
  );
};

export default CartButton;
