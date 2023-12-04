import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { capitalize } from '@mui/material';
import { handleGlobalError } from '../../lib/handleGlobalError';

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
      toast.success(
        `Welcome ${capitalize(response.data.firstName)} ${capitalize(
          response.data.lastName
        )}`
      );
      return response.data;
    } catch (error) {
      if (error.response.data.message.startsWith('Duplicate')) {
        toast.error('Email already exists in the database, please login');
        return thunkAPI.rejectWithValue(error.response.data);
      } else return handleGlobalError(error, thunkAPI);
    }
  }
);

// userLoginThunk
export const userLoginThunk = createAsyncThunk(
  'user/userLoginThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/login', user);
      toast.success(
        `Welcome ${capitalize(response.data.firstName)} ${capitalize(
          response.data.lastName
        )}`
      );
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
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
    signOut: (state) => {
      state.isMember = false;
      toast.success(
        `Goodbye ${capitalize(
          Cookies.get('dryermaster_firstName')
        )} ${capitalize(Cookies.get('dryermaster_lastName'))}`
      );
      Cookies.remove('dryermaster_token');
      Cookies.remove('dryermaster_role');
      Cookies.remove('dryermaster_firstName');
      Cookies.remove('dryermaster_lastName');
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
        Cookies.set('dryermaster_role', role);
        Cookies.set('dryermaster_firstName', firstName);
        Cookies.set('dryermaster_lastName', lastName);
      })
      .addCase(userRegisterThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      //  userLoginThunk
      .addCase(userLoginThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, { payload }) => {
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
        Cookies.set('dryermaster_role', role);
        Cookies.set('dryermaster_firstName', firstName);
        Cookies.set('dryermaster_lastName', lastName);
      })
      .addCase(userLoginThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        state.isLoading = false;
      });
  },
});
export const { getStateValues, signOut } = userSlice.actions;

export default userSlice.reducer;
