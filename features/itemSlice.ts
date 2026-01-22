import { getItems, getTrendingItemsDB } from "@/services/itemService";
import { MenuItem } from "@/types/MenuItem";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  current: MenuItem | null;
  trending: MenuItem[] | null;
  items: MenuItem[] | null;
  loading: boolean;
  error: string;
}

const initialState: userState = {
  current: null,
  trending: null,
  items: null,
  loading: false,
  error: "",
};

export const getAllItems = createAsyncThunk(
  "item/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const items = await getItems();

      return items ? items : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTrendingItems = createAsyncThunk(
  "item/getTrendingItems",
  async (_, { rejectWithValue }) => {
    try {
      console.log(901, "getTrendingItems");
      const items = await getTrendingItemsDB();

      return items ? items : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as MenuItem[];
        console.log("fulfilled payload", action.payload);
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTrendingItems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getTrendingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload as MenuItem[];
        console.log("fulfilled payload", action.payload);
      })
      .addCase(getTrendingItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
