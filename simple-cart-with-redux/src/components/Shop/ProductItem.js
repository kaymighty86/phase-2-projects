import Card from '../UI/Card';
import classes from './ProductItem.module.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const ProductItem = ({ id, title, price, description }) => {

  const dispatch = useDispatch();

  function handleAdd2Cart(){
    dispatch(cartActions.addItem(id));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAdd2Cart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
