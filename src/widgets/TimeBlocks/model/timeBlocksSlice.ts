import { ITimeBlock } from '@/entities/TimeBlock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Time } from '@internationalized/date';

interface InitialState {
  timeBlocks: ITimeBlock[];
}

const initialState: InitialState = {
  timeBlocks: [],
};

const timeBlocksSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {
    initializeTimeBlocks(state, action: PayloadAction<ITimeBlock[]>) {
      state.timeBlocks = action.payload;
    },

    setElapsed(state, action: PayloadAction<{ id: string; elapsed: Time }>) {
      const { id, elapsed } = action.payload;

      const timeBlock = state.timeBlocks.find(
        (timeBlock) => timeBlock.id === id
      );

      if (timeBlock) {
        timeBlock.elapsed = elapsed;
      }
    },
  },
});

export const {
  reducer: timeBlocksSliceReducer,
  actions: timeBlocksSliceActions,
} = timeBlocksSlice;
