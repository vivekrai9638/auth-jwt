import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addReply, addTweet, getAll, likeTweet } from "../actions/tweetActions";

const initialState = {
  feed: [],
};

export const getAllTweetAsync = createAsyncThunk("tweet/all", async (token) => {
  return getAll(token);
});

export const addTweetAsync = createAsyncThunk(
  "tweet/add",
  async ({ username, token, payload }) => {
    return addTweet(username, token, payload);
  }
);

export const addReplyAsync = createAsyncThunk(
  "reply/add",
  async ({ username, tweetId, token, payload }) => {
    return addReply(username, tweetId, token, payload);
  }
);

export const likeTweetAsync = createAsyncThunk(
  "tweet/like",
  async ({ username, tweetId, token }) => {
    return likeTweet(username, tweetId, token);
  }
);

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTweetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTweetAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.feed = action.payload;
      })
      .addCase(addTweetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTweetAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.feed.push(action.payload);
      })
      .addCase(addReplyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReplyAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.feed = [...state.feed.filter(t => t.id !== action.payload.id), action.payload];
      })
      .addCase(likeTweetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeTweetAsync.fulfilled, (state, action) => {
        state.status = "completed";
        state.feed = [...state.feed].map(t => {
          if(t.id === action.payload.id){
            return action.payload;
          }else{
            return t;
          }
        })
      });
  },
});

export const selectFeed = (state) => state.tweet.feed;


export default tweetSlice.reducer;
