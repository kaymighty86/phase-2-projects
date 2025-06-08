import { useRef, useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';

import CartModal from './CartModal.jsx';

export default function Header() {
  const modal = useRef();
  const {cart} = useContext(CartContext);

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
