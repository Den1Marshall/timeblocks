import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface isRunning {
  isRunning: boolean;
  timeBlockId: number | null;
}

interface InitialState {
  isRunning: boolean;
  timeBlockId: number | null;
}

const initialState: InitialState = {
  isRunning: false,
  timeBlockId: null,
};

const isRunningSlice = createSlice({
  name: 'isRunning',
  initialState,
  reducers: {
    setIsRunning(state, action: PayloadAction<isRunning>) {
      state.isRunning = action.payload.isRunning;
      state.timeBlockId = action.payload.timeBlockId;
    },
  },
});

export default isRunningSlice.reducer;
export const { setIsRunning } = isRunningSlice.actions;
