import {
  addItemDB,
  deleteItemDB,
  getItemByIdDB,
  getItemsByIdsDB,
  getItemsDB,
  getTrendingItemsDB,
  updateItemDB,
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
    try {
      const item = await getItemByIdDB(id);

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


      return items ? items : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const isDeleted = await deleteItemDB(id);

      return isDeleted ? id : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (item: Item, { rejectWithValue }) => {
    try {
      const updatedItem = await updateItemDB(item);


      return updatedItem
        ? updatedItem
        : rejectWithValue("Failed to get menu items");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addItem = createAsyncThunk(
  "item/addItem",
  async (item: Item, { rejectWithValue }) => {
    try {
      const newItem = await addItemDB(item);

      return newItem ? newItem : rejectWithValue("Failed to get menu items");
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
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.current = null;
        if (state.items) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as Item;
        if (state.items) {
          state.items = state.items.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          });
        }
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
