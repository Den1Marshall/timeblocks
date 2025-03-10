import { TimeBlock } from '@/entities/timeBlock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  timeBlocks: TimeBlock[];
  timeBlockToEdit: TimeBlock | null;
}

const initialState: InitialState = {
  timeBlocks: [],
  timeBlockToEdit: null,
};

const timeBlocksSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {
    initializeTimeBlocks(state, action: PayloadAction<TimeBlock[]>) {
      state.timeBlocks = action.payload;
    },

    setTimeBlockToEdit(state, action: PayloadAction<TimeBlock | null>) {
      state.timeBlockToEdit = action.payload;
    },
  },
});

export const {
  reducer: timeBlocksSliceReducer,
  actions: timeBlocksSliceActions,
} = timeBlocksSlice;
