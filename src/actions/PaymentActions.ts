import axios from 'axios';

import ACTION_TYPES from '../types/actionNames';
import { TGetPaymentsStart, TGetPaymentsSuccess, TGetPaymentsFailure } from '../types';
import { AppDispatch, RootState } from '../store';
import { showLoginSuccessMessage, showLoginErrorMessage } from '../helpers';
import {getPayersAction, setPayment} from '../reducers/Additional';



export const getPaymentsStart: () => TGetPaymentsStart = () => ({
  type: ACTION_TYPES.GET_PAYMENTS_START,
});

export const getPaymentsSuccess: (patients: any[]) => TGetPaymentsSuccess = (payments) => ({
  type: ACTION_TYPES.GET_PAYMENTS_SUCCESS,
  payload: payments,
});

export const getPaymentsFailure: (error?: any) => TGetPaymentsFailure = (error) => ({
  type: ACTION_TYPES.GET_PAYMENTS_FAILURE,
  payload: error,
});

export const getPayments = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getPaymentsStart());
    // TODO тут еще были всякие
    const response = await axios.get(
      'http://ortoped-crm.fastweb-tech.ru/api/person/payments?expand=person,user,status&page=0&pageSize=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getPaymentsSuccess(response.data));
  } catch (error) {
    dispatch(getPaymentsFailure());
  }
};

export const getPayers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get('http://ortoped-crm.fastweb-tech.ru/api/person/patients',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    dispatch(getPayersAction(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const addPayment = (formData: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.post('http://ortoped-crm.fastweb-tech.ru/api/person/payments', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(getPayments())
    console.log(formData, 'form')
  } catch (e) {
    console.log(e)
  }
}

export const deletePayment = (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.delete(`http://ortoped-crm.fastweb-tech.ru/api/person/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(getPayments())
  } catch (e) {
    console.log(e)
  }
}

export const putPayment = (id: any, formData: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.put(`http://ortoped-crm.fastweb-tech.ru/api/person/payments/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(getPayments())
  } catch (e) {
    console.log(e)
  }
}

export const getPayment = (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`http://ortoped-crm.fastweb-tech.ru/api/person/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(setPayment(response.data))
  } catch (e) {
    console.log(e)
  }
}