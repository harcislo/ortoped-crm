import axios from 'axios';

import ACTION_TYPES from '../types/actionNames';
import { TGetAgentsStart, TGetAgentsSuccess, TGetAgentsFailure } from '../types';
import { AppDispatch, RootState } from '../store';

export const getAgentsStart: () => TGetAgentsStart = () => ({
  type: ACTION_TYPES.GET_AGENTS_START,
});

export const getAgentsSuccess: (patients: any[]) => TGetAgentsSuccess = (agents) => ({
  type: ACTION_TYPES.GET_AGENTS_SUCCESS,
  payload: agents,
});

export const getAgentsFailure: (error?: any) => TGetAgentsFailure = (error) => ({
  type: ACTION_TYPES.GET_AGENTS_FAILURE,
  payload: error,
});

export const getAgents = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getAgentsStart());
    // TODO тут еще были всякие
    const response = await axios.get(
      'http://ortoped-crm.fastweb-tech.ru/api/person/agents?expand=patient,relationDegree&page=0&pageSize=10',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getAgentsSuccess(response.data));
  } catch (error) {
    dispatch(getAgentsFailure());
  }
};
