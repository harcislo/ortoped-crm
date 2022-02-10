import ACTION_TYPES from '../types/actionNames';
import {
  GetPatientsPayload,
  Patient,
  FieldError,
  TGetPatientsFailure,
  TGetPatientsStart,
  TGetPatientsSuccess,
  TGetSinglePatientFailure,
  TGetSinglePatientStart,
  TGetSinglePatientSuccess,
} from '../types';
import { AppDispatch, RootState } from '../store';
import { showLoginSuccessMessage, showLoginErrorMessage } from '../helpers';

export const getSinglePatientStart: () => TGetSinglePatientStart = () => ({
  type: ACTION_TYPES.GET_SINGLE_PATIENT_START,
});
export const getSinglePatientSuccess: (patient: any) => TGetSinglePatientSuccess = (patient) => ({
  type: ACTION_TYPES.GET_SINGLE_PATIENT_SUCCESS,
  payload: patient,
});
export const getSinglePatientFailure: (error?: any) => TGetSinglePatientFailure = (error) => ({
  type: ACTION_TYPES.GET_SINGLE_PATIENT_FAILURE,
  payload: error,
});
