import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';

const initialState = {
  name: '',
  lastName: '',
  email: '',
  users: [],
  isLoading: false,
};
export const operatorsThunk = createAsyncThunk(
  'operators/operatorsThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/user/all_operators', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    getSampleStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(operatorsThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(operatorsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        state.users = payload.data;
        state.isLoading = false;
      })
      .addCase(operatorsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getSampleStateValues } = operatorsSlice.actions;

export default operatorsSlice.reducer;
