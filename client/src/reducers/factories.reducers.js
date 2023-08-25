import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";

export const fetchFacts = createAsyncThunk("facts/fetchFacts", async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/`,
      withCredentials: true,
    });

    // console.log("res.data");
    // console.log(response.data);

    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});

export const followFac = createAsyncThunk("fact/followFac", async (fid) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/follow/${fid}`,
      withCredentials: true,
    });
    // console.log("res.data");
    // console.log(response.data);

    console.log(response);
    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});

export const unfollowFac = createAsyncThunk("fact/unfollowFac", async (fid) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/unfollow/${fid}`,
      withCredentials: true,
    });
    // console.log("res.data");
    // console.log(response.data);

    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});

export const likeFac = createAsyncThunk("fact/likeFac", async (fid) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/like/${fid}`,
      withCredentials: true,
    });
    // console.log("res.data");
    // console.log(response.data);

    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});
export const unlikeFac = createAsyncThunk("fact/unlikeFac", async (fid) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/dislike/${fid}`,
      withCredentials: true,
    });
    // console.log("res.data");
    // console.log(response.data);

    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});

export const likeComment = createAsyncThunk("fact/likeCom", async (data) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL_BACK}etablishment/likecomment/${data.fid}/${data.cid}`,
      withCredentials: true,
    });
    // console.log("res.data");
    // console.log(response.data);

    return response.data;
  } catch (err) {
    // console.log("erreur catch fetch" + err);
    throw err;
  }
});
export const dislikeComment = createAsyncThunk(
  "fact/dislikeCom",
  async (data) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL_BACK}etablishment/dislikecomment/${data.fid}/${data.cid}`,
        withCredentials: true,
      });
      // console.log("res.data");
      // console.log(response.data);

      return response.data;
    } catch (err) {
      // console.log("erreur catch fetch" + err);
      throw err;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "fact/deleteCom",
  async (data) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL_BACK}etablishment/deletecomment/${data.fid}/${data.cid}`,
        withCredentials: true,
      });
      // console.log("res.data");
      // console.log(response.data);

      return response.data;
    } catch (err) {
      // console.log("erreur catch fetch" + err);
      throw err;
    }
  }
);
export const postComment = createAsyncThunk(
  "fact/postComment",
  async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}etablishment/comment/${data.fid}`,
        withCredentials: true,
        data: data.data,
      });
      // if (response) {
      //   const dispatch = useDispatch();
      //   return dispatch(fetchFacts()); // Fetch updated user data
      // }
      return response.data;
    } catch (err) {
      // console.log("erreur catch fetch" + err);
      throw err;
    }
  }
);

const factsSlice = createSlice({
  name: "facts",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFacts.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(fetchFacts.fulfilled, (state, action) => {
      state.loading = false; // Set loading back to false
      state.data = action.payload; // Set the user data
    });
    builder.addCase(fetchFacts.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(followFac.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(followFac.fulfilled, (state, action) => {
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(followFac.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(unfollowFac.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(unfollowFac.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(unfollowFac.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(likeFac.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(likeFac.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(likeFac.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(unlikeFac.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(unlikeFac.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(unlikeFac.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(dislikeComment.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(dislikeComment.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(dislikeComment.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(likeComment.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(likeComment.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(likeComment.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      // state.data = action.payload; // Set the user data
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });

    builder.addCase(postComment.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      console.log("action payload");
      console.log(action.payload);
      state.loading = false; // Set loading back to false
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
  },
});

export default factsSlice.reducer;
