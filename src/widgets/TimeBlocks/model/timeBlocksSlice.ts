import { ITimeBlock } from '@/entities/TimeBlock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Time } from '@internationalized/date';

interface InitialState {
  timeBlocks: ITimeBlock[];
  timeBlockToEdit: ITimeBlock | null;
}

const initialState: InitialState = {
  timeBlocks: [],
  timeBlockToEdit: null,
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

    setTimeBlockToEdit(state, action: PayloadAction<ITimeBlock | null>) {
      state.timeBlockToEdit = action.payload;
    },
  },
});

export const {
  reducer: timeBlocksSliceReducer,
  actions: timeBlocksSliceActions,
} = timeBlocksSlice;
