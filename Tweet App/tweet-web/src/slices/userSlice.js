import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from "../actions/userActions";

const initialState = {
  email: null,
  userName: null,
  firstName: null,
  lastName: null,
  avatar: null
};

export const loadUserByUsernameAsync = createAsyncThunk(
  "user/search",
  async ({username, token}) => {
    return search(username, token);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserByUsernameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserByUsernameAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.email = action.payload?.email;
        state.userName = action.payload?.userName;
        state.firstName = action.payload?.firstName;
        state.avatar = action.payload?.avatar;
      })
  },
});

export default userSlice.reducer;
