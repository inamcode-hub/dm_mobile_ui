import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../lib/localStorage';
import Cookies from 'js-cookie';

const initialState = {
  firstName: '',
  lastName: '',
  isMember: Cookies.get('dryermaster_token') ? true : false,
  isLoading: false,
};
export const userThunk = createAsyncThunk(
  'user/userThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// userRegisterThunk
export const userRegisterThunk = createAsyncThunk(
  'user/userRegisterThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/register', user);
      // console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        console.log(payload);
        state.isLoading = true;
      })
      .addCase(userThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      //  userRegisterThunk
      .addCase(userRegisterThunk.pending, (state, { payload }) => {
        console.log('promise pending');

        state.isLoading = true;
      })
      .addCase(userRegisterThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        const { token, role, firstName, lastName } = payload;
        state.isLoading = false;
        state.isMember = true;
        Cookies.set(
          'dryermaster_token',
          token,
          { expires: 30 },
          { secure: true },
          { sameSite: 'none' }
        );
        setItemInLocalStorage('dryermaster_role', role);
        setItemInLocalStorage('dryermaster_firstName', firstName);
        setItemInLocalStorage('dryermaster_lastName', lastName);
      })
      .addCase(userRegisterThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getStateValues } = userSlice.actions;

export default userSlice.reducer;
