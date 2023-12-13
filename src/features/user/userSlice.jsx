import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { capitalize } from '@mui/material';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { goodbyeMessage, removeUserCookies, setUserCookies } from './lib';

const initialState = {
  firstName: '',
  lastName: '',
  isMember: Cookies.get('dryermaster_token') ? true : false,
  isDmOnline: false,
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
        `Welcome back ${capitalize(response.data.firstName)} ${capitalize(
          response.data.lastName
        )}`
      );
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// userForgotPasswordThunk
export const userForgotPasswordThunk = createAsyncThunk(
  'user/userForgotPasswordThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/forgot_password', user);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// userForgotPasswordUpdateThunk
export const userForgotPasswordUpdateThunk = createAsyncThunk(
  'user/userForgotPasswordUpdateThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.put(
        '/user/forgot_password_update',
        user
      );
      toast.success(response.data.message);
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
      goodbyeMessage();
      removeUserCookies();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state, { payload }) => {
        console.log('promise pending');
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
        state.isLoading = true;
      })
      .addCase(userRegisterThunk.fulfilled, (state, { payload }) => {
        setUserCookies(payload);
        state.isMember = true;
        state.isLoading = false;
      })
      .addCase(userRegisterThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userLoginThunk
      .addCase(userLoginThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, { payload }) => {
        setUserCookies(payload);
        state.isLoading = false;
        state.isMember = true;
      })
      .addCase(userLoginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userForgotThunk
      .addCase(userForgotPasswordThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userForgotPasswordThunk.fulfilled, (state, { payload }) => {
        window.location.href = `/email-sent/${payload.email}`;
        state.isLoading = false;
      })
      .addCase(userForgotPasswordThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userForgotThunk
      .addCase(userForgotPasswordUpdateThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(
        userForgotPasswordUpdateThunk.fulfilled,
        (state, { payload }) => {
          setUserCookies(payload);
          state.isLoading = false;
          state.isMember = true;
        }
      )
      .addCase(userForgotPasswordUpdateThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
export const { getStateValues, signOut } = userSlice.actions;

export default userSlice.reducer;
