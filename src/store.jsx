import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';
import localStorageSlice from './features/localStorage/localStorageSlice';
import UserSlice from './features/user/userSlice';
import systemSlice from './features/system/systemSlice';
import userProfileSlice from './features/user/userProfileSlice';
import userOperatorSlice from './features/user/userOperatorSlice';
import messageSlice from './features/message/messageSlice';
import dryerMasterSlice from './features/dryerMaster/dryerMasterSlice';
import homeSlice from './features/home/homeSlice';

const reducers = {
  sample: samplesSlice,
  localStorage: localStorageSlice,
  user: UserSlice,
  userProfile: userProfileSlice,
  operators: userOperatorSlice,
  system: systemSlice,
  message: messageSlice,
  dryerMaster: dryerMasterSlice,
  home: homeSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
