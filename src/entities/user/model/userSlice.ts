import { User } from './user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  user?: User;
}

const initialState: InitialState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload;
    },
  },
});

export const { reducer: userSliceReducer, actions: userSliceActions } =
  userSlice;
