import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { registers } from './registers';

const initialState = registers.reduce((acc, { tagName }) => {
  acc[tagName] = '';
  return acc;
}, {});

initialState.isLoading = false;

export const dryerMastersThunk = createAsyncThunk(
  'dryerMasters/dryerMastersThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dryerMastersSlice = createSlice({
  name: 'dryerMasters',
  initialState,
  reducers: {
    getDryerMasterStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    addServerData: (state, { payload }) => {
      payload.forEach((item) => {
        if (item.tagName in state) {
          state[item.tagName] = item.value;
        }
      });
      state.serverData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dryerMastersThunk.pending, (state) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(dryerMastersThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(dryerMastersThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});

export const { getDryerMasterStateValues, addServerData } =
  dryerMastersSlice.actions;

export default dryerMastersSlice.reducer;
