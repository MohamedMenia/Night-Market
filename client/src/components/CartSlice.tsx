import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCart } from "../models/types";

const initialState: { cart: TCart[] } = {
  cart: [
    {
      _id: "",
      productName: "",
      brand: "",
      price: 0,
      description: "",
      stockQuantity: 0,
      imageURL: "",
      cartTotalAmount: 0,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<TCart>) {
      if (state.cart.find((product) => product._id === action.payload._id)) {
        alert("this prodduct already in cart");
      } else{
         state.cart.push({ ...action.payload })
         alert(`${action.payload.productName}has been added to cart`);
        };
    },
    editQuantity(
      state,
      action: PayloadAction<{ id: string; cartTotalAmount: number }>
    ) {
      state.cart.map((product) => {
        if (product._id === action.payload.id) {
          product.cartTotalAmount = action.payload.cartTotalAmount;
        }
        return product;
      });
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { addToCart, editQuantity, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
