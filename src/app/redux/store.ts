import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from '@/entities/User';
import { timeBlocksSliceReducer } from '@/widgets/TimeBlocks';
import { tasksSliceReducer } from '@/views/Home';

export const makeStore = () => {
  return configureStore({
    reducer: { userSliceReducer, timeBlocksSliceReducer, tasksSliceReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
