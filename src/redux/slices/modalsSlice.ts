import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Modal {
  name: string;
  visible: boolean;
}

const wakeLockModal: Modal = {
  name: 'wakeLock',
  visible: true,
};

interface InitialState {
  modals: Modal[];
}

const initialState: InitialState = {
  modals: [wakeLockModal],
};

interface Payload {
  name: string;
  visible: boolean;
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModalVisibility(state, action: PayloadAction<Payload>) {
      const modal = state.modals.find(
        (modal) => modal.name === action.payload.name
      );

      if (modal) {
        modal.visible = action.payload.visible;
      }
    },
  },
});

export default modalsSlice.reducer;
export const { toggleModalVisibility } = modalsSlice.actions;
