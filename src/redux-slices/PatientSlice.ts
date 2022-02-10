import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { GetPatientsPayload, Patient, Task } from '../types';
import api from '../api';

interface PatientState {
  patients: Patient[];
  loading: boolean;
  patient: Patient | {};
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  patient: {},
};

export const counterSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    getPatientsStart: (state) => {
      state.loading = true;
    },
    getPatientsSuccess: (state, action: PayloadAction<GetPatientsPayload>) => {
      state.patients = action.payload;
      state.loading = false;
    },
    getPatientsFailure: (state) => {
      state.loading = false;
    },
    getSinglePatientStart: (state) => {
      state.loading = true;
    },
    getSinglePatientSuccess: (state, action: PayloadAction<Patient>) => {
      state.patient = action.payload;
      state.loading = false;
    },
    getSinglePatientFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getPatientsStart, getPatientsSuccess, getPatientsFailure, getSinglePatientSuccess } =
  counterSlice.actions;

export const getPatientsSelector = (state: RootState) => state.patient.patients;

// Thunk actions
export const getPatients = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    dispatch(getPatientsStart());
    const response = await api.get<Patient[]>('person/patients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        expand: 'city,foto,doctor,partner,outPartner,agents,source,gender,tags',
      },
    });
    dispatch(getPatientsSuccess(response.data));
  } catch (error) {
    dispatch(getPatientsFailure());
  }
};

export const getSinglePatient =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      //dispatch(getSinglePatientStart());
      const response = await api.get<Patient>(`person/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          expand: 'city,foto,doctor,partner,outPartner,agents,source,gender,tags',
        },
      });
      dispatch(getSinglePatientSuccess(response.data));
    } catch (error) {
      //dispatch(getSinglePatientFailure());
    }
  };

export default counterSlice.reducer;
