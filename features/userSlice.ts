import { addUser } from "@/services/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "./../types/User";

interface userState {
  current: User | null;
  loading: boolean;
  error: string;
}

const initialState: userState = {
  current: null,
  loading: false,
  error: "",
};

const BASE_URL = "http://localhost:3000/api/users";

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: User, { rejectWithValue }) => {
    try {
      const newUser = await addUser(user);

      console.log("newUser", { newUser });

      if (!newUser) rejectWithValue("Failed to register user");
      return newUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, user);

      if (!response.data) rejectWithValue("Failed to login user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as User;
        console.log("fulfilled payload", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
