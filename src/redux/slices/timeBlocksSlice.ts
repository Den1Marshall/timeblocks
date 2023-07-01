import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TimeBlock } from '../../utils/TimeBlock';

export interface TimeBlocksSliceState {
  timeBlocks: TimeBlock[];
}

const initialState: TimeBlocksSliceState = {
  timeBlocks: [
    {
      id: 1001,
      name: 'Your test Block!',
      time: 10,
      color: 'primary.main',
      progressPercent: 0,
      seconds: '00',
      minutes: '00',
      hours: '00',
      elapsed: 0,
    },
  ],
};

interface UpdateTimeBlock {
  seconds: string;
  minutes: string;
  hours: string;
  progressPercent: number;
  elapsed: number;
  id: number;
}

const timeBlocksSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {
    addTimeBlock(state, action: PayloadAction<TimeBlock>) {
      state.timeBlocks.push(action.payload);
    },

    removeTimeBlock(state, action) {
      state.timeBlocks = state.timeBlocks.filter(
        (timeBlock) => timeBlock.id !== action.payload
      );
    },

    clearTimeBlocks(state) {
      state.timeBlocks = [];
    },

    updateTimeBlock(state, action: PayloadAction<UpdateTimeBlock>) {
      const { elapsed, seconds, minutes, hours, progressPercent, id } =
        action.payload;

      const tb = state.timeBlocks.find((timeBlock) => timeBlock.id === id);

      if (tb) {
        tb.elapsed = elapsed;
        tb.seconds = seconds;
        tb.minutes = minutes;
        tb.hours = hours;
        tb.progressPercent = progressPercent;
      } else {
        console.log('ERR IN SLICE');
      }
    },
  },
});

export default timeBlocksSlice.reducer;

export const {
  addTimeBlock,
  removeTimeBlock,
  clearTimeBlocks,
  updateTimeBlock,
} = timeBlocksSlice.actions;
