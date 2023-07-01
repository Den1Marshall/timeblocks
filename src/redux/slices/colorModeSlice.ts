import { PaletteMode } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  colorMode: PaletteMode;
  watchUser: boolean;
}

const initialState: InitialState = {
  colorMode: window.matchMedia('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light',
  watchUser: true,
};

const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    toggleColorMode(state) {
      if (!state.watchUser) {
        state.colorMode = state.colorMode === 'dark' ? 'light' : 'dark';
        state.watchUser = false;
      }
    },

    toggleWatchUserColorMode(state, action: PayloadAction<boolean>) {
      action.payload ? (state.watchUser = true) : (state.watchUser = false);
    },

    setColorMode(state, action: PayloadAction<PaletteMode>) {
      if (state.watchUser) {
        state.colorMode = action.payload;
      }
    },

    resetDefaultColorMode(state) {
      state.colorMode = initialState.colorMode;
      state.watchUser = initialState.watchUser;
    },
  },
});

export default colorModeSlice.reducer;
export const {
  toggleColorMode,
  toggleWatchUserColorMode,
  setColorMode,
  resetDefaultColorMode,
} = colorModeSlice.actions;
