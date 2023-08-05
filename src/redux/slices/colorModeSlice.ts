import { PaletteMode } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ColorMode = 'light' | 'dark' | 'system';

interface InitialState {
  colorMode: ColorMode;
}

const initialState: InitialState = {
  colorMode: 'system',
};

const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    setWatchUser(state) {
      state.colorMode = 'system';
    },

    setColorMode(state, action: PayloadAction<PaletteMode>) {
      state.colorMode = action.payload;
    },

    resetDefaultColorMode(state) {
      state.colorMode = initialState.colorMode;
    },
  },
});

export default colorModeSlice.reducer;
export const { setWatchUser, setColorMode, resetDefaultColorMode } =
  colorModeSlice.actions;
