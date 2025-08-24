import { createSlice } from "@reduxjs/toolkit";

import availableItems from "../data/availableProducts.json";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {items:[], cartVisible: false},
    reducers: {
        addItem(currentCart, action){//the reducer function takes in the previous "State" and the passwed "Payload" which can be anything
            const id = action.payload;
            const cartItems = currentCart.items;
            
            if(cartItems.some(item => item.id === id)){//check if the item exists in the cart already. If so then increase quantity
                const itemIndex = cartItems.findIndex(item => item.id === id);
                cartItems[itemIndex].quantity += 1;
            }
            else{
                cartItems.splice(0,0,availableItems.find(item => item.id === id));//add the new item to the start of the cart
            }
        },
        removeItem(currentCart, action){
            const id = action.payload;
            const cartItems = currentCart.items;
            
            if(cartItems.some(item => item.id === id)){//check if the item exists in the cart.
                const itemIndex = cartItems.findIndex(item => item.id === id);

                if(cartItems[itemIndex].quantity > 1){
                    cartItems[itemIndex].quantity -= 1;//reduce quantity by 1
                }
                else{
                    cartItems.splice(itemIndex,1);//delete item
                }
            }
        },
        toggleCartVisibility(currentCart){
            currentCart.cartVisible = !currentCart.cartVisible;
        }
    }
});

export const cartActions = cartSlice.actions;