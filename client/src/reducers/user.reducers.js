import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const fetchUser = createAsyncThunk("user/fetchUser", async (uid) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_BACK}user/${uid}`,
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





export const fetchImage = createAsyncThunk(
  "user/fetchImage",
  async (data, { getState }) => {
    try {
      const uid = getState().user.data._id; // Get the user's id from the store
      console.log("uid from fetchImage :" + uid);

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}user/upload`,
        withCredentials: true,
        data,
      });

      if (response) {
        const dispatch = useDispatch();
        return dispatch(fetchUser(uid));
      } // Fetch updated user data
    } catch (err) {
      throw err;
    }
  }
);

export const fetchInfo = createAsyncThunk(
  "user/fetchInfo",
  async (data, { getState }) => {
    try {
      const uid = getState().user.data._id; // Get the user's id from the store
      console.log("uid from fetchInfo :" + uid);

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}user/update`,
        withCredentials: true,
        data,
      });
      console.log(response);
      if (response) {
        const dispatch = useDispatch();
        return dispatch(fetchUser(uid)); // Fetch updated user data
      }
    } catch (err) {
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false, error: null }, // Introduce a loading and error state
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // console.log('action payload')
      // console.log(action.payload)
      state.loading = false; // Set loading back to false
      state.data = action.payload; // Set the user data
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(fetchImage.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      console.log("action payload");
      console.log(action.payload);
      state.loading = false; // Set loading back to false
      state.data = action.payload; // Set updated user data
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
    builder.addCase(fetchInfo.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      console.log("action payload");
      console.log(action.payload);
      state.loading = false; // Set loading back to false
      state.data = action.payload; // Set updated user data
    });
    builder.addCase(fetchInfo.rejected, (state, action) => {
      state.loading = false; // Set loading back to false
      state.error = action.error.message; // Set the error message
    });
  },
});



export default userSlice.reducer;

