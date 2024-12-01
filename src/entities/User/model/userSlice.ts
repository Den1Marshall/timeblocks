import { IUser } from './IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  user?: IUser;
}

const initialState: InitialState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser(state, action: PayloadAction<IUser | undefined>) {
      state.user = action.payload;
    },
  },
});

export const { reducer: userSliceReducer, actions: userSliceActions } =
  userSlice;
