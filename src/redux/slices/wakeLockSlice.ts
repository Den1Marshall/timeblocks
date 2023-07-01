import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  enabled: boolean;
}

const initialState: InitialState = {
  enabled: true,
};

const wakeLockSlice = createSlice({
  name: 'wakeLock',
  initialState,
  reducers: {
    toggleWakeLock(state) {
      state.enabled = !state.enabled;
    },

    resetDefaultWakeLock(state) {
      state.enabled = initialState.enabled;
    },
  },
});

export default wakeLockSlice.reducer;
export const { toggleWakeLock, resetDefaultWakeLock } = wakeLockSlice.actions;
