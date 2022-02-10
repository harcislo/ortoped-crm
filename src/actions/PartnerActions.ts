import axios from 'axios';

import ACTION_TYPES from '../types/actionNames';
import { TGetPartnersStart, TGetPartnersSuccess, TGetPartnersFailure } from '../types';
import { AppDispatch, RootState } from '../store';

export const getPartnersStart: () => TGetPartnersStart = () => ({
  type: ACTION_TYPES.GET_PARTNERS_START,
});

export const getPartnersSuccess: (partners: any[]) => TGetPartnersSuccess = (partners) => ({
  type: ACTION_TYPES.GET_PARTNERS_SUCCESS,
  payload: partners,
});

export const getPartnersFailure: (error?: any) => TGetPartnersFailure = (error) => ({
  type: ACTION_TYPES.GET_PARTNERS_FAILURE,
  payload: error,
});

export const getPartners = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getPartnersStart());
    // TODO тут еще были всякие
    const response = await axios.get(
      'http://ortoped-crm.fastweb-tech.ru/api/person/partners?expand=patients,outPatients&page=0&pageSize=10',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getPartnersSuccess(response.data));
  } catch (error) {
    dispatch(getPartnersFailure());
  }
};
