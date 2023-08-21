import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import cartReducer from "./reducers/CartReducers";
// import authReducer from "./reducers/AuthReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    // auth: authReducer,
  },
});

export default store;
