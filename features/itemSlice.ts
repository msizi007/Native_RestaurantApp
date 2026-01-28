import {
  getItemByIdDB,
  getItemsByIdsDB,
  getItemsDB,
  getTrendingItemsDB,
} from "@/services/itemService";
import { Item } from "@/types/Item";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  current: Item | null;
  trending: Item[] | null;
  items: Item[] | null;
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

export const getItems = createAsyncThunk(
  "item/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const items = await getItemsDB();

      return items ? items : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getItemById = createAsyncThunk(
  "item/getItemById",
  async (id: number, { rejectWithValue }) => {
    console.log(2001, { id });
    try {
      const item = await getItemByIdDB(id);
      console.log(2002, { item });

      return item ? item : rejectWithValue("Failed to get menu items");
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

export const getItemsByIds = createAsyncThunk(
  "item/getItemByIds",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const items = await getItemsByIdsDB(ids);

      console.log(4002, { items });

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
      .addCase(getItems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as Item[];
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTrendingItems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getTrendingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload as Item[];
      })
      .addCase(getTrendingItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getItemById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as Item;
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("rejected payload ITEM", action.payload);
      })
      .addCase(getItemsByIds.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getItemsByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as Item[];
      })
      .addCase(getItemsByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
