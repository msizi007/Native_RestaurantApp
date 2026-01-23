import { createCartItem } from "@/services/cartItemService";
import { createCart, getCartByUserIdDB } from "@/services/cartService";
import { CartItem, CartItemPayload } from "@/types/CartItem";
import { Item } from "@/types/Item";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[] | [];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const getCartByUserId = createAsyncThunk(
  "cart/getCartByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const cart = await getCartByUserIdDB(userId);

      return cart ? cart : rejectWithValue("Failed to get cart");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { item, userId }: { item: Item; userId: number },
    { rejectWithValue },
  ) => {
    try {
      console.log(300, { item, userId });
      const cart = await getCartByUserIdDB(userId);
      console.log(301, { cart });

      if (!cart) {
        // create new Cart and add CartItem
        const newCart = await createCart(userId);
        console.log(303, { newCart });
        const payload: CartItemPayload = {
          cartId: newCart!.id!,
          itemId: item.id!,
          quantity: 1,
          totalPrice: item.price,
        };
        const newCartItem = await createCartItem(payload);
        return newCart;
      }
      return item;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
