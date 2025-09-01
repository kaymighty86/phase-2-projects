import { configureStore } from "@reduxjs/toolkit";

import { cartSlice } from "./cartSlice";
import { syncSlice } from "./syncManagerSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        syncManager: syncSlice.reducer
    }
});

export default store;