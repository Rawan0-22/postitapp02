import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../Config";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
};

//---thunk for save pose
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post("http://localhost:3001/savePost", {
      postMsg: postData.postMsg,
      email: postData.email,
    });
    const post = response.data.post;
    return post; //Return the new post to Redux
  } catch (error) {
    console.log(error);
  }
});
//---save post thunk up to here

//---thunk for getting pose
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await axios.get("http://localhost:3001/getPosts");
    return response.data.posts;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
//---get post thunk up to here

//---thunk for like,dislike
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    //Pass along the URL the postId
    const response = await axios.put(
      `http://localhost:3001/likePost/${postData.postId}`,
      {
        userId: postData.userId,
      },
    );
    const post = response.data.post;
    return post;
  } catch (error) {
    console.log(error);
  }
});
//---like,dislike thunk up to here

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //---extra reducers for seving post
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        // Update the state with fetched posts adding the latest post in the beginning
        state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //-----up to here extra reducers for saving post

      //-----extra reducers for getting post
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with fetched posts
        console.log(action.payload);
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //----up to here extra reducers for getting post

      //-----extra reducers for like,dislike
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        //Search the post id from the posts state
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );
        //If found, update the likes property of the found post to the current value of the likes
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //----up to here extra reducers for like,dislike
  },
});
export default postSlice.reducer;
