import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const Cart = (props) => {

  const cartItems = useSelector(store => store.cart.items);

  const dispatchCartAction = useDispatch();

  function handleToggleCartVisibiliy(){
    dispatchCartAction(cartActions.toggleCartVisibility());
  }

  return (
    <Card className={classes.cart}>
      <div className={classes.cartHeader}>
        <h2>Your Shopping Cart</h2>
        <button onClick={handleToggleCartVisibiliy}>Hide</button>
      </div>
      <ul>
        {cartItems.length > 0? 
          cartItems.map(item => 
            <CartItem key={item.id} id={item.id} title = {item.title} quantity = {item.quantity}  price = {item.price} />) 
          : <p>Your cart is empty. Select an Item to buy {":)"}</p>
        }
      </ul>
    </Card>
  );
};

export default Cart;
