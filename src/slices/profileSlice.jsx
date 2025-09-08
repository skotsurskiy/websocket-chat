import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../http/index.js";

export const getProfile = createAsyncThunk(
  'users/getProfile',
  async (_, thunkAPI) => {
    try {
      const response = await axiosApi('/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Loading failed');
    }
  }
)

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    username: '',
    avatarUrl: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export default profileSlice.reducer;