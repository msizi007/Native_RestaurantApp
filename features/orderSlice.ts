import {
  createOrderDB,
  deleteOrderDB,
  getOrderByIdDB,
  getOrdersByUserIdDB,
} from "@/services/orderService";
import { Order } from "@/types/Order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface orderState {
  current: Order | null;
  orders: Order[] | null;
  loading: boolean;
  error: string;
}

const initialState: orderState = {
  current: null,
  orders: null,
  loading: false,
  error: "",
};

export const getOrdersByUserId = createAsyncThunk(
  "order/getOrderByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const order = await getOrdersByUserIdDB(userId);

      return order ? order : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOrderById = createAsyncThunk(
  "order/getOrderByUserId",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const order = await getOrderByIdDB(orderId);

      return order ? order : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order: Order, { rejectWithValue }) => {
    try {
      console.log(2201, { order });
      const newOrder = await createOrderDB(order);
      console.log(2202, { newOrder });

      return newOrder ? newOrder : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const isDeleted = await deleteOrderDB(orderId);

      return isDeleted ? orderId : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (state.orders) {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload,
          );
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        console.log("ORDER SUCESS", action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("ORDER FAILED", action.payload);
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      });
  },
});
