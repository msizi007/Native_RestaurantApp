import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import imageReducer from "./features/imageSlice";
import itemReducer from "./features/itemSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    item: itemReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
