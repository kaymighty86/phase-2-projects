import classes from './CartItem.module.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const CartItem = ({ id, title, quantity, price }) => {

  const total = price * quantity;

  const dispatchCartUpdate = useDispatch();

  function handleAddQuantity(){
    dispatchCartUpdate(cartActions.addItem(id));
  }

  function handleReduceQuantity(){
    dispatchCartUpdate(cartActions.removeItem(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleReduceQuantity}>-</button>
          <button onClick={handleAddQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
