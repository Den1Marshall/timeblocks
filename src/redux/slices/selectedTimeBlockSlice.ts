import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  id: number | null;
}

const initialState: InitialState = {
  id: null,
};

const selectedTimeBlockSlice = createSlice({
  name: 'selectedTimeBlock',
  initialState,
  reducers: {
    setSelectedTimeBlockId(state, action: PayloadAction<number | null>) {
      state.id = action.payload;
    },
  },
});

export default selectedTimeBlockSlice.reducer;
export const { setSelectedTimeBlockId } = selectedTimeBlockSlice.actions;
