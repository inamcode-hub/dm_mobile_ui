import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies, setUserCookies, updateUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';

const initialState = {
  firstName: '',
  paymentCards: [],
  isLoading: false,
  isUpdating: false,
};
export const userAccountThunk = createAsyncThunk(
  'userAccount/userAccountThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const userAccountPaymentCardsThunk = createAsyncThunk(
  'userAccount/userAccountPaymentCardsThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/dryermaster/account/stripe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    getUserAccountStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userAccountThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userAccountThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userAccountPaymentCardsThunk.fulfilled, (state, { payload }) => {
        state.paymentCards = payload.data.data;
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getUserAccountStateValues } = userAccountSlice.actions;

export default userAccountSlice.reducer;
