import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    cart: {},
    addItem: (id)=>{},
    updateQuantity: (id,amount)=>{}
});

function CartUpdateFunc(state, action){
    const updatedItems = [...state.items];

    if(action.type == "ADD-ITEM"){
        //find existing item if it exists
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.productId
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        if (existingCartItem) {//if item exists in cart, update quantity
            console.log(existingCartItem);
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.productId);
            updatedItems.push({
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
    }
    else if(action.type == "UPDATE-QTY"){
        //find existing item if it exists
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.productId
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.payload.amount
            }

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                updatedItems[existingCartItemIndex] = updatedItem;
            }
        }

        return {
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({children}){
    const [shoppingCart, dispatchCartUpdate] = useReducer(CartUpdateFunc, {
        items: [],
    });

    function handleAddItemToCart(id) {
        dispatchCartUpdate({
            type: "ADD-ITEM",
            payload: {
                productId: id
            }
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        dispatchCartUpdate({
            type: "UPDATE-QTY",
            payload: {
                productId,
                amount
            }
        })
    }

    const CartContextData = {
        cart: shoppingCart,
        addItem: handleAddItemToCart,
        updateQuantity: handleUpdateCartItemQuantity
    }
    
    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}