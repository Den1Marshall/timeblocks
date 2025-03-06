import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './task';

interface InitialState {
  tasks: Task[];
}

const initialState: InitialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initializeTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { reducer: tasksSliceReducer, actions: tasksSliceActions } =
  tasksSlice;
