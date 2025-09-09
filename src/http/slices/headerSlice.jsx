import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    title: "Chats", // початковий заголовок
  },
  reducers: {
    setHeaderTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setHeaderTitle } = headerSlice.actions;
export default headerSlice.reducer;
