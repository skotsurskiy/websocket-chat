import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem('token')
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { setToken } = headerSlice.actions;
export default headerSlice.reducer;
