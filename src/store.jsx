import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';
import localStorageSlice from './features/localStorage/localStorageSlice';
import UserSlice from './features/user/userSlice';
import systemSlice from './features/system/systemSlice';

const reducers = {
  sample: samplesSlice,
  localStorage: localStorageSlice,
  user: UserSlice,
  system: systemSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
