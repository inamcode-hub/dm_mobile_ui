import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';
import localStorageSlice from './features/localStorage/localStorageSlice';

const reducers = {
  sample: samplesSlice,
  localStorage: localStorageSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
