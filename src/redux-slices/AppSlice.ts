import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from '../store';
import { GetPatientsPayload, Patient, Task } from '../types';
import api from '../api';
import { ROUTE_NAME } from '../navigation/routeNames';

interface AppState {
  selectedPageKey: number;
}

const initialState: AppState = {
  selectedPageKey: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedPageKey: (state, action: PayloadAction<number>) => {
      state.selectedPageKey = action.payload;
    },
  },
});

export const { setSelectedPageKey } = appSlice.actions;

export const getSelectedPageKey = (state: RootState) => state.app.selectedPageKey;

export default appSlice.reducer;
