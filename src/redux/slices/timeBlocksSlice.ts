import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TimeBlock } from '../../utils/TimeBlock';
import dayjs, { Dayjs } from 'dayjs';

export interface TimeBlocksSliceState {
  timeBlocks: TimeBlock[];
}

const initialState: TimeBlocksSliceState = {
  timeBlocks: [
    {
      id: 0,
      name: 'Your test Block!',
      duration: 10000,
      color: 'primary.main',
      progressPercent: 0,
      timeStart: dayjs().startOf('hour'),
      timeEnd: dayjs().startOf('hour').add(10, 'seconds'),
      elapsed: 0,
    },
  ],
};

interface UpdateTimeBlock {
  progressPercent: number;
  elapsed: number;
  id: number;
}

interface UpdateTimeBlockSettings {
  id: number;
  name?: string;
  duration?: number;
  color?: string;
  timeStart?: Dayjs;
  timeEnd?: Dayjs;
}

const timeBlocksSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {
    addTimeBlock(state, action: PayloadAction<TimeBlock>) {
      state.timeBlocks.push(action.payload);
    },

    removeTimeBlock(state, action: PayloadAction<number>) {
      state.timeBlocks = state.timeBlocks.filter(
        (timeBlock) => timeBlock.id !== action.payload
      );
    },

    clearTimeBlocks(state) {
      state.timeBlocks = [];
    },

    updateTimeBlock(state, action: PayloadAction<UpdateTimeBlock>) {
      const { elapsed, progressPercent, id } = action.payload;

      const tb = state.timeBlocks.find((timeBlock) => timeBlock.id === id);

      if (tb) {
        tb.elapsed = elapsed;
        tb.progressPercent = progressPercent;
      }
    },

    updateTimeBlockSettings(
      state,
      action: PayloadAction<UpdateTimeBlockSettings>
    ) {
      const { id, name, duration, color, timeStart, timeEnd } = action.payload;

      const tb = state.timeBlocks.find((timeBlock) => timeBlock.id === id);

      if (tb) {
        if (name) {
          tb.name = name;
        }
        if (duration) {
          tb.duration = duration;
        }
        if (color) {
          tb.color = color;
        }
        if (timeStart) {
          tb.timeStart = timeStart;
        }
        if (timeEnd) {
          tb.timeEnd = timeEnd;
        }
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
  updateTimeBlockSettings,
} = timeBlocksSlice.actions;
