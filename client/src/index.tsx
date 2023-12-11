import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/CartSlice"
import { Provider } from "react-redux";
const store =configureStore({
  reducer:{
    cart:cartReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </React.StrictMode>
);
