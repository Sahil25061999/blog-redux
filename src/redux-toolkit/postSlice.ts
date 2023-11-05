import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

export interface Post {
  id: number | string;
  title: string;
  body: string;
  emoticons: Record<string, number>;
  createdAt: string;
}

interface PostState {
  status: "idle" | "pending" | "rejected";
  error: string;
  posts: Array<Post>;
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
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      },
      prepare: (title: string, body: string): { payload: Post } => {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            emoticons: {
              "❤️": 0,
              "👍": 0,
              "⭐": 0,
            },
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateVotes: (state, action) => {
      console.log(action.payload.id);
      const post = state.posts.find((item) => item.id === action.payload.id)!;
      post.emoticons[`${action.payload.emoji}`] += 1;
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
        const loadedPost = action.payload
          .map((item: Post) => {
            item.createdAt = new Date().toISOString();
            item.emoticons = {
              "❤️": 0,
              "👍": 0,
              "⭐": 0,
            };
            return item;
          })
          .sort((a: Post, b: Post) => b.createdAt.localeCompare(a.createdAt));
        state.posts = loadedPost;
      });
  },
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const { addPost, updateVotes } = postSlice.actions;
export default postSlice.reducer;
