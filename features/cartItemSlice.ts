import {
  decrementQuantityDB,
  deleteCartItemDB,
  getCartItemsDB,
  incrementQuantityDB,
} from "@/services/cartItemService";
import { CartItem } from "@/types/CartItem";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartItemState {
  cartItems: CartItem[];
  current: CartItem | null;
  cartId: number | null;
  loading: boolean;
  error: string;
}

const initialState: CartItemState = {
  cartItems: [],
  current: null,
  cartId: null,
  loading: false,
  error: "",
};

export const getCartItems = createAsyncThunk(
  "cartItem/getCartItems",
  async (cartId: number, { rejectWithValue }) => {
    try {
      const cartItems = await getCartItemsDB(cartId);
      return cartItems
        ? { cartItems, cartId }
        : rejectWithValue("Failed to get cart items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cartItem/removeCartItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const isDeleted = await deleteCartItemDB(id);

      return isDeleted ? id : rejectWithValue("Failed to delete cart item");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const incrementItemQuantity = createAsyncThunk(
  "cartItem/incrementItemQuantity",
  async (
    { cartId, itemId }: { cartId: number; itemId: number },
    { rejectWithValue },
  ) => {
    console.log(3000, { cartId, itemId });
    try {
      const updatedCartItem = await incrementQuantityDB(cartId, itemId);
      return updatedCartItem
        ? updatedCartItem
        : rejectWithValue("Failed to get cart items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const decrementItemQuantity = createAsyncThunk(
  "cartItem/decrementItemQuantity",
  async (
    { cartId, itemId }: { cartId: number; itemId: number },
    { rejectWithValue },
  ) => {
    try {
      const updatedCartItem = await decrementQuantityDB(cartId, itemId);
      return updatedCartItem
        ? updatedCartItem
        : rejectWithValue("Failed to get cart items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.fulfilled, (state, action) => {
        const { cartItems, cartId } = action.payload as {
          cartItems: CartItem[];
          cartId: number;
        };
        state.cartId = cartId;
        //console.log(5000, { cartItems });
        // state.cartItems = cartItems.reverse(); // #!
        state.cartItems = cartItems.sort((a, b) => a.itemId - b.itemId);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(incrementItemQuantity.fulfilled, (state, action) => {
        state.current = action.payload as CartItem;
      })
      .addCase(incrementItemQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(decrementItemQuantity.fulfilled, (state, action) => {
        state.current = action.payload as CartItem;
      })
      .addCase(decrementItemQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const id = action.payload as number;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default cartItemSlice.reducer;
