import { createSlice } from "@reduxjs/toolkit";

export const syncSlice = createSlice({
    name: "syncManager",
    initialState: {notification: null},
    reducers: {
        showNotification(state, action){
            state.notification = {
                title: action.payload.title,
                message: action.payload.message,
                status: action.payload.status || null
            }
        }
    }
});

export function synchronise(cartItems = []){
    
    return async function(dispatch){
        //SEND DATA TO THE BACKEND
        //1. Show notification that we're initiating backend communication
        dispatch(syncSlice.actions.showNotification({
            title: "Synchronising",
            message: "Sending Data to Backend...",
            status: null
        }));

        //2. Initiate sending data to backend
        try{
            (async function sendCart(){
                const response = await fetch("https://simple-cart-app-8b587-default-rtdb.firebaseio.com/cart.json", {
                    method: "PUT",
                    body: JSON.stringify({items: cartItems})
                });

                if(!response.ok){
                    dispatch(syncSlice.actions.showNotification({
                        title: "Error",
                        message: "Unable to add item to cart.",
                        status: "error"
                    }));
                }

                //3. Show notification that Item has been added to the cart successfully
                dispatch(syncSlice.actions.showNotification({
                    title: "Successful",
                    message: "Item has been added to the cart successfully.",
                    status: "success"
                }));
            })();
        }
        catch(error){
            console.log(error.toString())
        }
    }
}