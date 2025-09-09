import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from "../../util/variables.js";
import Cookies from 'js-cookie';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({username, password, confirmPassword}, thunkAPI) => {
    try {
      const payload = {username, password, confirmPassword};
      console.log('Sending payload:', payload);
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        confirmPassword
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({username, password}, thunkAPI) => {
    try {
      const payload = {username, password};
      console.log('Sending payload:', payload);
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.token = null;
      Cookies.remove('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('token', action.payload.token, { expires: 1, secure: false, sameSite: 'Lax' });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        Cookies.set('token', action.payload.token, { expires: 1, secure: false, sameSite: 'Lax' });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        Cookies.set('token', action.payload.token, { expires: 1, secure: false, sameSite: 'Lax' });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {logout, setToken} = authSlice.actions;
export default authSlice.reducer;
