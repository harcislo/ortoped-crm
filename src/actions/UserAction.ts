import axios from 'axios';

import ACTION_TYPES from '../types/actionNames';
import { TGetUsersFailure, TGetUsersStart, TGetUsersSuccess } from '../types';
import { AppDispatch, RootState } from '../store';

export const getUsersStart: () => TGetUsersStart = () => ({
  type: ACTION_TYPES.GET_USERS_START,
});
export const getUsersSuccess: (users: any[]) => TGetUsersSuccess = (users) => ({
  type: ACTION_TYPES.GET_USERS_SUCCESS,
  payload: users,
});
export const getUsersFailure: (error?: any) => TGetUsersFailure = (error) => ({
  type: ACTION_TYPES.GET_USERS_FAILURE,
  payload: error,
});

export const getUsers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getUsersStart());
    // TODO тут еще были всякие
    const response = await axios.get('http://ortoped-crm.fastweb-tech.ru/api/users/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
};
