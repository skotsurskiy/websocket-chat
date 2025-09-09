import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../index.js";
import {API_URL} from "../../util/variables.js";
import {setToken} from "./authSlice.jsx";
import Cookies from "js-cookie";

export const getProfile = createAsyncThunk(
  'users/getProfile',
  async (_, thunkAPI) => {
    try {
      const response = await axiosApi('/users/profile', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Loading failed');
    }
  }
)

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({username, file}, thunkAPI) => {
    console.log(`username: ${username}`);
    try {
      const formData = new FormData();
      if (username != null) {
        formData.append("username", username);
      }
      console.log(file);
      formData.append("file", file);

      const response = await axiosApi.put(`${API_URL}/users/update`, formData,  {
        headers: {"content-type": "multipart/form-data"},
      });
      if (response.data.token) {
        thunkAPI.dispatch(setToken(response.data.token));
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Loading failed'
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    username: '',
    avatarUrl: null,
    error: null
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
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
      });
  }
});

export default profileSlice.reducer;