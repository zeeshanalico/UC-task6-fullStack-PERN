import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { itemsSlice } from "./slices/itemsSlice";
const reducer = {
    auth: authSlice.reducer,
    items: itemsSlice.reducer

};

const store = configureStore({ reducer });
export default store;  