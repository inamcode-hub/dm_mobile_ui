import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';

const reducers = {
  sample: samplesSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
