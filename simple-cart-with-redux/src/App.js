import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { cartActions } from './store/cartSlice';
import { synchronise } from './store/syncManagerSlice';

let isFirstExecution = true;

function App() {
  const cartVisible = useSelector(state => state.cart.cartVisible);
  const cartItems = useSelector(state => state.cart.items);
  const notification = useSelector(state => state.syncManager.notification);

  const dispatch = useDispatch();

  useEffect(()=>{
    //get cart data from backend
    (async function fetchCart(){
        const response = await fetch("https://simple-cart-app-8b587-default-rtdb.firebaseio.com/cart.json");

        if(!response.ok){
          console.log("Error fetching cart data.")
          return;
        }

        const savedCartItems = await response.json();
        if(savedCartItems != null){
          // console.log(savedCartItems);
          dispatch(cartActions.replaceCartItems(savedCartItems.items));
        }
      })();
  },[])

  useEffect(()=>{//whenever the cart items changes, send data to backend
    if(!isFirstExecution){//avoid sending cart data to the backend as soon as the app first loads
      dispatch(synchronise(cartItems));
    }

    isFirstExecution = false;
    
  },[cartItems]);
  
  return (
    <>
      {notification != null && <Notification title={notification.title} message={notification.message} status={notification.status}/>}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
