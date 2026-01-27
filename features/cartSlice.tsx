import {
  createCartItemDB,
  getCartItemByIdDB,
  incrementQuantityDB,
} from "@/services/cartItemService";
import { createCart, getCartByUserIdDB } from "@/services/cartService";
import { Cart } from "@/types/Cart";
import { CartItem, CartItemPayload } from "@/types/CartItem";
import { Item } from "@/types/Item";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  cartId: number | null;
  cart: Cart | null;
  total: number;
  loading: boolean;
  error: string;
}

const initialState: CartState = {
  items: [],
  cart: null,
  cartId: null,
  total: 0,
  loading: false,
  error: "",
};

export const getCartByUserId = createAsyncThunk(
  "cart/getCartByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const cart = await getCartByUserIdDB(userId);

      if (!cart) {
        const newCart = await createCart(userId);
        return newCart ? newCart : rejectWithValue("Failed to create cart");
      }

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
      let cart = await getCartByUserIdDB(userId);
      console.log(301, { cart });

      // if cart does not exist for user then create new cart
      if (!cart) {
        // create new Cart and add CartItem
        cart = await createCart(userId);
        console.log(303, { cart });
      }
      const payload: CartItemPayload = {
        cartId: cart!.id!,
        itemId: item.id!,
        quantity: 1,
        totalPrice: item.price,
      };

      // if cartItem already exists for this cart and item then increment quantity
      const existingCartItem = await getCartItemByIdDB(
        payload.cartId,
        item.id!,
      );

      console.log(1001, { existingCartItem });
      if (existingCartItem) {
        const updatedCartItem = await incrementQuantityDB(
          payload.cartId,
          item.id!,
        );
        return updatedCartItem;
      }
      const newCartItem = await createCartItemDB(payload);
      console.log(304, { newCartItem });
      return newCartItem;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        state.cartId = action.payload.id!;
        state.cart = action.payload as Cart;
        console.log("Featched cart", action.payload);
      })
      .addCase(getCartByUserId.rejected, (state, action) => {
        state.error = action.payload as string;
        console.log("Failed to featch cart", action.payload);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload as CartItem);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      });
  },
});

export default cartSlice.reducer;
