import { ITimeBlock } from '@/entities/TimeBlock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

    setTimeBlockToEdit(state, action: PayloadAction<ITimeBlock | null>) {
      state.timeBlockToEdit = action.payload;
    },
  },
});

export const {
  reducer: timeBlocksSliceReducer,
  actions: timeBlocksSliceActions,
} = timeBlocksSlice;
