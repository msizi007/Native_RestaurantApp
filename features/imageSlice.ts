import { getImages } from "@/services/imageService";
import { imageResponse } from "@/types/Globals";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
  categoryImages: imageResponse[] | null;
  trendingImages: imageResponse[] | null;
  loading: boolean;
  error: string;
}

const initialState: userState = {
  categoryImages: null,
  trendingImages: null,
  loading: false,
  error: "",
};

export const getCategoryImages = createAsyncThunk(
  "image/getCategoryImages",
  async (_, { rejectWithValue }) => {
    console.log("getMenuImages");
    try {
      const images = await getImages("images", "categories");

      return images ? images : rejectWithValue("Failed to get menu images");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTrendingImages = createAsyncThunk(
  "image/getTrendingImages",
  async (_, { rejectWithValue }) => {
    console.log("getMenuImages");
    try {
      const images = await getImages("images", "trending");

      return images ? images : rejectWithValue("Failed to get menu images");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryImages.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryImages = action.payload as imageResponse[];
      })
      .addCase(getCategoryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTrendingImages.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingImages = action.payload as imageResponse[];
      })
      .addCase(getTrendingImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default imageSlice.reducer;
