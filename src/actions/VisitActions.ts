import axios from 'axios';

import ACTION_TYPES from '../types/actionNames';
import { TGetVisitsFailure, TGetVisitsStart, TGetVisitsSuccess } from '../types';
import { AppDispatch, RootState } from '../store';

export const getVisitsStart: () => TGetVisitsStart = () => ({
  type: ACTION_TYPES.GET_VISITS_START,
});

export const getVisitsSuccess: (visits: any[]) => TGetVisitsSuccess = (visits) => ({
  type: ACTION_TYPES.GET_VISITS_SUCCESS,
  payload: visits,
});

export const getVisitsFailure: (error?: any) => TGetVisitsFailure = (error) => ({
  type: ACTION_TYPES.GET_VISITS_FAILURE,
  payload: error,
});

export const getVisits = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getVisitsStart());
    // TODO тут еще были всякие
    const response = await axios.get(
      'http://ortoped-crm.fastweb-tech.ru/api/med/visits?expand=comment,files,disease,status,place,doctor,type,priority,sickList&page=0&pageSize=10',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getVisitsSuccess(response.data));
  } catch (error) {
    dispatch(getVisitsFailure());
  }
};
