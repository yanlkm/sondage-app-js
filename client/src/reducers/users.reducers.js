import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL_BACK}user/`,
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

  const usersSlice = createSlice({
    name: "users",
    initialState: { data: null, loading: false, error: null }, // Introduce a loading and error state
    reducers: {},
    extraReducers(builder) {

      builder.addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Set loading to true
        state.error = null; // Reset any previous error
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        // console.log('action payload')
        // console.log(action.payload)
        state.loading = false; // Set loading back to false
        state.data = action.payload; // Set the user data
      });
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; // Set loading back to false
        state.error = action.error.message; // Set the error message
      });

    },
  });

  export default usersSlice.reducer;