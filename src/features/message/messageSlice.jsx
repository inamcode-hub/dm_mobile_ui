import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies } from '../user/lib';
import { handleGlobalError } from '../../lib/handleGlobalError';

const initialState = {
  messages: [],
  totalMessages: 0,
  totalPages: 0,
  messagePerPage: 0,
  page: 1,
  limit: 15,
  isLoading: false,
};
export const messagesThunk = createAsyncThunk(
  'messages/messagesThunk',
  async (_, thunkAPI) => {
    // get state values page and limit by thunkApi
    const { page, limit } = thunkAPI.getState().message;
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get(
        `/message/user?page=${page}&limit=${limit}
      `,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessageStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(messagesThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(messagesThunk.fulfilled, (state, { payload }) => {
        state.messages = [...state.messages, ...payload.result]; // append new messages
        state.totalMessages = payload.totalMessages;
        state.totalPages = payload.totalPages;
        state.page += 1; // increment page
        state.isLoading = false;
        state.hasMore = state.messages.length < state.totalMessages;
      })
      .addCase(messagesThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getMessageStateValues } = messagesSlice.actions;

export default messagesSlice.reducer;
