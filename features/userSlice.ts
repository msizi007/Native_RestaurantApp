import { addUserDB, loginUserDB } from "@/services/userService";
import { validateEmail } from "@/utils/validator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginCredentials, User } from "./../types/User";

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

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: User, { rejectWithValue }) => {
    try {
      if (
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.phoneNumber ||
        !user.address ||
        !user.password
      )
        return rejectWithValue("All fields are required");

      const isValidEmail = validateEmail(user.email);

      if (!isValidEmail) return rejectWithValue("Invalid email address");

      const newUser = await addUserDB(user);

      console.log("newUser", { newUser });

      return newUser ? newUser : rejectWithValue("Failed to register user");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      if (!credentials.email || !credentials.password)
        return rejectWithValue("All fields are required");

      // if not a valid email
      if (!validateEmail(credentials.email))
        return rejectWithValue("Invalid email address");

      console.log(402, credentials);
      const user = await loginUserDB(credentials);

      console.log(400, user);

      return user ? user : rejectWithValue("Failed to login user");
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
        console.log(900, "sucess: ", action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
