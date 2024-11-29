import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams, sortParams}) => {
    // console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");
    // console.log("filterParams", filterParams);
    // console.log("sortParams", sortParams);
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    // console.log("query : ", query);
    // const { category = [], brand = [], sortBy = "price-lowtohigh" } = query
    // console.log(query.category);
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    // console.log("result : ", result);

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;