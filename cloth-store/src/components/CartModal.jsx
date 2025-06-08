import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

import { CartContext } from '../store/CartContext.jsx';

const CartModal = forwardRef(function Modal({ title }, ref) {
  const { cart } = useContext(CartContext);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  //Set the type of modal buttons that should appear depending on the number of items in the cart
  let modalActions = <button>Close</button>;
  if (cart.items.length > 0) {//if there are items in the cart, add a checkout button to the actions
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {modalActions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
