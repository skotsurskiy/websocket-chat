import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../index.js";

export const createChat = createAsyncThunk(
  'chats/createChat',
  async (username, thunkAPI) => {
    try {
      const response = await axiosApi.post(`/chats/create/${username}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Creating chat failed');
    }
  });

export const findAllChats = createAsyncThunk(
  'chats/findAllChats',
  async (_, thunkAPI) => {
    try {
      const response = await axiosApi.get('/chats');
      console.log(response.data);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response?.data || 'Loading chats failed');
    }
  }
)

export const findChatByUsername = createAsyncThunk(
  'chats/findChatByUsername',
  async (username, thunkAPI) => {
    try {
      const response = await axiosApi.get(`/chats/${username}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Loading chat failed');
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({content, chatId}, thunkAPI) => {
    console.log(`payload: ${content} , ${chatId}`);
    try {
      const response = await axiosApi.post(`/chats/send`, {
        content,
        chatId
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Sending message failed');
    }
  }
)

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    loading: false,
    currentChat: null,
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(findAllChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.loading = false;
      })
      .addCase(findAllChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(findAllChats.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(findChatByUsername.fulfilled, (state, action) => {
        state.currentChat = action.payload;
      })
      .addCase(findChatByUsername.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
})

export const {setCurrentChat} = chatSlice.actions;
export default chatSlice.reducer;
