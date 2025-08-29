import ProductItem from './ProductItem';
import classes from './Products.module.css';

import availableProducts from "../../data/availableProducts.json";

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const Products = (props) => {

  const dispatch = useDispatch();

  function handleAddProduct(id){
    dispatch(cartActions.addItem(id));
  }

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {availableProducts.map(item => 
          <ProductItem
            key = {item.id}
            id = {item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            onAdd = {handleAddProduct}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
