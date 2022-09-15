import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/authActions";

const initialState = {
  email: null,
  token: null,
  userName: null,
  roles: [],
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    return login(username, password);
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (payload) => {
    return register(payload);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.email = action.payload?.email;
        state.userName = action.payload?.username;
        state.token = action.payload?.token;
        state.roles = action.payload?.roles;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.email = action.payload?.email;
        state.userName = action.payload?.username;
        state.token = action.payload?.token;
        state.roles = action.payload?.roles;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUsername = (state) => state.auth.userName;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
