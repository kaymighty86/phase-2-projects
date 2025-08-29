import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = ({ id, title, price, description, onAdd }) => {

  function handleAdd2Cart(){
    onAdd(id);
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
