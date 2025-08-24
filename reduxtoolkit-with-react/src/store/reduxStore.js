// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";
import { counterSlice } from "./counterSlice";

//THE STORE
//you can put all the reducers of the multiple slices created (if applicable) in this object. Seperated by comma of course
const store = configureStore({
    reducer: {
        counterSlice: counterSlice.reducer,
        authSlice: authSlice.reducer
    }
});

export default store;