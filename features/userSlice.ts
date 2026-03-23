import {
  addUserDB,
  getAllUsersDB,
  getUsersByIdsDB,
  loginUserDB,
  updateUserDB,
} from "@/services/userService";
import { validateEmail } from "@/utils/validator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginCredentials, User } from "./../types/User";

interface userState {
  current: User | null;
  users: User[] | null;
  loading: boolean;
  error: string;
  userType: "Admin" | "User";
}

const initialState: userState = {
  current: null,
  users: null,
  loading: false,
  error: "",
  userType: "User",
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


      return newUser ? newUser : rejectWithValue("Failed to register user");
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    const adminCredentials = {
      email: "admin07@gmail.com",
      password: "admin07",
    };

    try {
      if (!credentials.email || !credentials.password)
        return rejectWithValue("All fields are required");

      // if not a valid email
      if (!validateEmail(credentials.email))
        return rejectWithValue("Invalid email address");

      // if admin credentials then login as admin
      if (
        credentials.email === adminCredentials.email &&
        credentials.password === adminCredentials.password
      ) {
        return { user: adminCredentials, userType: "Admin" };
      }

      const user = await loginUserDB(credentials);


      return user
        ? { user, userType: "User" }
        : rejectWithValue("Failed to login user");
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred";
      return rejectWithValue(message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (user: User, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserDB(user);
      return updatedUser
        ? updatedUser
        : rejectWithValue("Failed to update user");
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred";
      return rejectWithValue(message);
    }
  },
);

export const getUsersByIds = createAsyncThunk(
  "user/getUsersByIds",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const users = await getUsersByIdsDB(ids);
      return users ? users : rejectWithValue("Failed to get users");
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred";
      return rejectWithValue(message);
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getAllUsersDB();
      return users ? users : rejectWithValue("Failed to get users");
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred";
      return rejectWithValue(message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as User;
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
        const { user, userType } = action.payload as {
          user: User;
          userType: "Admin" | "User";
        };
        state.loading = false;
        state.current = user;
        state.userType = userType;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload as User;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUsersByIds.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUsersByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsersByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload as User[];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
