import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import {
  VisitType,
  VisitStatus,
  TaskStatus,
  CommonPriority,
  RelationDegree,
  OperationType,
  VisitPlace,
  Clinic,
  PatientSource,
  PatientTag,
  Diagnosis,
  MKB,
  City,
} from '../types';
import api from '../api';

interface DirectoriesState {
  visitTypes: VisitType[];
  visitStatuses: VisitStatus[];
  taskStatuses: TaskStatus[];
  commonPriorities: CommonPriority[];
  relationDegrees: RelationDegree[];
  visitPlaces: VisitPlace[];
  clinics: Clinic[];
  patientSources: PatientSource[];
  patientTags: PatientTag[];
  operationsTypes: OperationType[];
  diagnoses: Diagnosis[];
  //localization: VisitType[];
  typesOfOperations: VisitType[];
  mkb: MKB[];
  cities: City[];
}

const initialState: DirectoriesState = {
  visitTypes: [],
  visitStatuses: [],
  taskStatuses: [],
  commonPriorities: [],
  relationDegrees: [],
  operationsTypes: [],
  visitPlaces: [],
  clinics: [],
  patientSources: [],
  patientTags: [],
  typesOfOperations: [],
  diagnoses: [],
  //localization: [],
  mkb: [],
  cities: [],
};

export const counterSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {
    getVisitTypesSuccess: (state, action: PayloadAction<VisitType[]>) => {
      state.visitTypes = action.payload;
    },
    getVisitStatusesSuccess: (state, action: PayloadAction<VisitStatus[]>) => {
      state.visitStatuses = action.payload;
    },
    getTaskStatusesSuccess: (state, action: PayloadAction<TaskStatus[]>) => {
      state.taskStatuses = action.payload;
    },
    getCommonPrioritiesSuccess: (state, action: PayloadAction<CommonPriority[]>) => {
      state.commonPriorities = action.payload;
    },
    getRelationDegreeSuccess: (state, action: PayloadAction<RelationDegree[]>) => {
      state.relationDegrees = action.payload;
    },
    getVisitPlacesSuccess: (state, action: PayloadAction<VisitPlace[]>) => {
      state.visitPlaces = action.payload;
    },
    getClinicsSuccess: (state, action: PayloadAction<Clinic[]>) => {
      state.clinics = action.payload;
    },
    getPatientSourcesSuccess: (state, action: PayloadAction<PatientSource[]>) => {
      state.patientSources = action.payload;
    },
    getPatientTagsSuccess: (state, action: PayloadAction<PatientTag[]>) => {
      state.patientTags = action.payload;
    },
    getOperationsTypesSuccess: (state, action: PayloadAction<OperationType[]>) => {
      state.operationsTypes = action.payload;
    },
    getDiagnosesSuccess: (state, action: PayloadAction<Diagnosis[]>) => {
      state.diagnoses = action.payload;
    },
    getMkbSuccess: (state, action: PayloadAction<MKB[]>) => {
      state.mkb = action.payload;
    },
    getCitiesSuccess: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
  },
});

export const {
  getVisitTypesSuccess,
  getVisitStatusesSuccess,
  getTaskStatusesSuccess,
  getCommonPrioritiesSuccess,
  getRelationDegreeSuccess,
  getVisitPlacesSuccess,
  getClinicsSuccess,
  getPatientSourcesSuccess,
  getPatientTagsSuccess,
  getOperationsTypesSuccess,
  getDiagnosesSuccess,
  getMkbSuccess,
  getCitiesSuccess,
} = counterSlice.actions;

// Selectors

export const getVisitTypesSelector = (state: RootState) => state.directories.visitTypes;
export const getVisitStatusesSelector = (state: RootState) => state.directories.visitStatuses;
export const getTaskStatusesSelector = (state: RootState) => state.directories.taskStatuses;
export const getCommonPrioritiesSelector = (state: RootState) => state.directories.commonPriorities;
export const getRelationDegreeSelector = (state: RootState) => state.directories.relationDegrees;
export const getVisitPlacesSelector = (state: RootState) => state.directories.visitPlaces;
export const getClinicsSelector = (state: RootState) => state.directories.clinics;
export const getPatientSourcesSelector = (state: RootState) => state.directories.patientSources;
export const getPatientTagsSelector = (state: RootState) => state.directories.patientTags;
export const getOperationsTypesSelector = (state: RootState) => state.directories.operationsTypes;
export const getDiagnosesSelector = (state: RootState) => state.directories.diagnoses;
//export const getLocalizationSelector = (state: RootState) => state.directories.localization;
export const getMkbSelector = (state: RootState) => state.directories.mkb;
export const getCitiesSelector = (state: RootState) => state.directories.cities;

// Thunk actions
export const getVisitTypes = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get('med/visit-types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getVisitTypesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getVisitStatuses = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<VisitStatus[]>('med/visit-statuses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getVisitStatusesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getTaskStatuses = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<TaskStatus[]>('tracker/statuses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getTaskStatusesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCommonPriorities =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const response = await api.get<VisitType[]>('common/priorities?page=0', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCommonPrioritiesSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export const getRelationDegree = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<VisitType[]>('person/relation-degrees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getRelationDegreeSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getVisitPlaces = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<VisitPlace[]>('med/visit-places', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getVisitPlacesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getClinics = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<Clinic[]>('med/visit-places', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getClinicsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getPatientSources = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<VisitType[]>('person/patient-sources', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPatientSourcesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getPatientTags = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<PatientTag[]>('person/tag', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPatientTagsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getOperationsTypes =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const token = getState().auth.token;
      const response = await api.get<VisitType[]>('med/operation-types', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getOperationsTypesSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export const getDiagnoses = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get('med/diagnoses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getDiagnosesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

// export const getLocalizationSuccess: (visitTypes: VisitType[]) => TGetLocalizationSuccess = (localization) => ({
//   type: ACTION_TYPES.GET_LOCALIZATION_SUCCESS,
//   payload: localization,
// });

// export const getLocalization = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     const token = getState().auth.token;
//     const response = await axios.get('http://ortoped-crm.fastweb-tech.ru/api/med/body-location/tree', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     dispatch(getLocalizationSuccess(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getMkb = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<MKB[]>('med/mkb10s', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getMkbSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCities = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<City[]>('geo/cities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        expand: 'country',
      },
    });
    dispatch(getCitiesSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export default counterSlice.reducer;
