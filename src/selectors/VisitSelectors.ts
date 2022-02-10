import { RootState } from '../store';

export const getVisitsSelector = (state: RootState) => state.visit.visits;
