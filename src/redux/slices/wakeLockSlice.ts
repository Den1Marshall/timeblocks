import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isWakelogSupported } from '../../utils/wakeLock';

interface InitialState {
  enabled: boolean;
}

const initialState: InitialState = {
  enabled: isWakelogSupported(),
};

const wakeLockSlice = createSlice({
  name: 'wakeLock',
  initialState,
  reducers: {
    setWakeLock(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },

    resetDefaultWakeLock(state) {
      state.enabled = initialState.enabled;
    },
  },
});

export default wakeLockSlice.reducer;
export const { setWakeLock, resetDefaultWakeLock } = wakeLockSlice.actions;
