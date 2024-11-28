import { configureStore }  from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/productSlice"
import shopProductSlice from "./shop/productSlice"




const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductSlice
    }
})



export default store;