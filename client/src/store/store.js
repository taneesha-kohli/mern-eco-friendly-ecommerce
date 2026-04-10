import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import cartReducer from "./shop/CartSlice";
import productReducer from "./shop/ProductSlice"

const store = configureStore({
  reducer:{
    auth: authReducer,
    cart: cartReducer,
    product: productReducer
  }
})

export default store;