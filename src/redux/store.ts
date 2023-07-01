import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import timeBlocksSlice from './slices/timeBlocksSlice';
import isRunningSlice from './slices/isRunningSlice';
import colorModeSlice from './slices/colorModeSlice';
import modalsSlice from './slices/modalsSlice';
import wakeLockSlice from './slices/wakeLockSlice';

const timeBlocksConfig = {
  key: 'timeBlocks',
  storage,
};
const timeBlocksReducer = persistReducer(timeBlocksConfig, timeBlocksSlice);

const colorModeConfig = {
  key: 'colorMode',
  storage,
};

const modalsConfig = {
  key: 'modals',
  storage,
};

const wakeLockConfig = {
  key: 'wakeLock',
  storage,
};

const colorModeReducer = persistReducer(colorModeConfig, colorModeSlice);
const modalsReducer = persistReducer(modalsConfig, modalsSlice);
const wakeLockReducer = persistReducer(wakeLockConfig, wakeLockSlice);

const store = configureStore({
  reducer: {
    timeBlocksReducer,
    isRunningSlice,
    colorModeReducer,
    modalsReducer,
    wakeLockReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);

export const persistedTimeBlocksReducer = persistReducer(
  timeBlocksConfig,
  timeBlocksSlice
);
