import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./features/imageSlice";
import itemReducer from "./features/itemSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
