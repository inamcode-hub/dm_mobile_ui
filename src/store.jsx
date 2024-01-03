import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';
import localStorageSlice from './features/localStorage/localStorageSlice';
import UserSlice from './features/user/userSlice';
import systemSlice from './features/system/systemSlice';
import userProfileSlice from './features/user/userProfileSlice';

const reducers = {
  sample: samplesSlice,
  localStorage: localStorageSlice,
  user: UserSlice,
  userProfile: userProfileSlice,
  system: systemSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
