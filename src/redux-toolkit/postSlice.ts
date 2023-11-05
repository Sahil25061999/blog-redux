import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface PostState {
  status: "idle" | "pending" | "rejected";
  error: string;
  posts: Array<{ id: number; title: string }>;
}

const initialState: PostState = {
  posts: [],
  status: "idle", // idle | pending | rejected
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  try {
    const postRes = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return postRes.data;
  } catch (e) {
    console.log(e);
  }
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "rejected";
        state.error = "Error fetching Posts";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = [...action.payload];
      });
  },
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const { addPost } = postSlice.actions;
export default postSlice.reducer;
