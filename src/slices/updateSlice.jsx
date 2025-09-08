import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL} from "../util/variables.js";
import axiosApi from "../http/index.js";
import {setToken} from "./tokenSlice.jsx";

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
    username: "",
    avatarUrl: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
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
  },
});

export default profileSlice.reducer;