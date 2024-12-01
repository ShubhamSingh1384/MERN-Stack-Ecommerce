import { configureStore }  from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/productSlice"
import shopProductSlice from "./shop/productSlice"
import shopCartSlice from "./shop/cartSlice"




const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductSlice,
        shopCart : shopCartSlice
    }
})



export default store;