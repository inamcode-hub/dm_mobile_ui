import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  users: [],
  isLoading: false,
  isLoadingRegister: false,
  openDialog: false,
  refreshData: false,
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
export const operatorsRegisterThunk = createAsyncThunk(
  'operators/operatorsRegisterThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    const { operators } = thunkAPI.getState();

    try {
      const response = await customFetch.post(
        '/user/add_operator',
        { ...operators },
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

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    getUserOperatorStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(operatorsThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(operatorsThunk.fulfilled, (state, { payload }) => {
        state.users = payload.data;

        state.isLoading = false;
      })
      .addCase(operatorsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(operatorsRegisterThunk.pending, (state, { payload }) => {
        state.isLoadingRegister = true;
      })
      .addCase(operatorsRegisterThunk.fulfilled, (state, { payload }) => {
        toast.success('Operator added successfully');
        state.refreshData = !state.refreshData;
        state.isLoadingRegister = false;
        state.openDialog = false;
        state.firstName = '';
        state.lastName = '';
        state.email = '';
        state.password = '';
      })
      .addCase(operatorsRegisterThunk.rejected, (state, { payload }) => {
        state.isLoadingRegister = false;
      });
  },
});
export const { getUserOperatorStateValues } = operatorsSlice.actions;

export default operatorsSlice.reducer;
