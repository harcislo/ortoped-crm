import { Pagination, VisitType, VisitStatus, TaskStatus } from '.';
import ACTION_TYPES from './actionNames';
import { User, FieldError, Task, VisitPlace, Clinic, PatientTag, MKB, City } from './common';

// Login
export type TLoginStart = {
  type: ACTION_TYPES.LOGIN_START;
};
export type TLoginSuccess = {
  type: ACTION_TYPES.LOGIN_SUCCESS;
  payload: User;
};
export type TLoginFailure = {
  type: ACTION_TYPES.LOGIN_FAILURE;
  payload?: FieldError;
};

export type TSetToken = {
  type: ACTION_TYPES.SET_TOKEN;
  payload: string;
};

export type TLogout = {
  type: ACTION_TYPES.LOGOUT;
};

export type TAuthAction = TLoginStart | TLoginSuccess | TLoginFailure | TSetToken | TLogout;

// Patient
export type TGetPatientsStart = {
  type: ACTION_TYPES.GET_PATIENTS_START;
};
export type TGetPatientsSuccess = {
  type: ACTION_TYPES.GET_PATIENTS_SUCCESS;
  payload: any;
};
export type TGetPatientsFailure = {
  type: ACTION_TYPES.GET_PATIENTS_FAILURE;
  payload?: any;
};
export type TGetSinglePatientStart = {
  type: ACTION_TYPES.GET_SINGLE_PATIENT_START;
};
export type TGetSinglePatientSuccess = {
  type: ACTION_TYPES.GET_SINGLE_PATIENT_SUCCESS;
  payload: any;
};
export type TGetSinglePatientFailure = {
  type: ACTION_TYPES.GET_SINGLE_PATIENT_FAILURE;
  payload?: any;
};
export type TPatientAction =
  | TGetPatientsStart
  | TGetPatientsSuccess
  | TGetPatientsFailure
  | TGetSinglePatientStart
  | TGetSinglePatientSuccess
  | TGetSinglePatientFailure;

// Task
export type TGetTasksStart = {
  type: ACTION_TYPES.GET_TASKS_START;
};
export type TGetTasksSuccess = {
  type: ACTION_TYPES.GET_TASKS_SUCCESS;
  payload: {
    tasks: Task[];
  } & Pagination;
};
export type TGetTasksFailure = {
  type: ACTION_TYPES.GET_TASKS_FAILURE;
  payload?: any;
};
export type TGetSingleTaskStart = {
  type: ACTION_TYPES.GET_SINGLE_TASK_START;
};
export type TGetSingleTaskSuccess = {
  type: ACTION_TYPES.GET_SINGLE_TASK_SUCCESS;
  payload: Task;
};
export type TGetSingleTaskFailure = {
  type: ACTION_TYPES.GET_SINGLE_TASK_FAILURE;
  payload?: any;
};
export type TCreateTaskStart = {
  type: ACTION_TYPES.CREATE_TASK_START;
};
export type TCreateTaskSuccess = {
  type: ACTION_TYPES.CREATE_TASK_SUCCESS;
  payload?: Task;
};
export type TCreateTaskFailure = {
  type: ACTION_TYPES.CREATE_TASK_FAILURE;
  payload?: FieldError;
};
export type TEditTaskStart = {
  type: ACTION_TYPES.EDIT_TASK_START;
};
export type TEditTaskSuccess = {
  type: ACTION_TYPES.EDIT_TASK_SUCCESS;
  payload?: Task;
};
export type TEditTaskFailure = {
  type: ACTION_TYPES.EDIT_TASK_FAILURE;
  payload?: FieldError;
};
export type TDeleteTaskStart = {
  type: ACTION_TYPES.DELETE_TASK_START;
};
export type TDeleteTaskSuccess = {
  type: ACTION_TYPES.DELETE_TASK_SUCCESS;
  payload?: Task;
};
export type TDeleteTaskFailure = {
  type: ACTION_TYPES.DELETE_TASK_FAILURE;
  payload?: FieldError;
};

export type TGetTasksAction =
  | TGetTasksStart
  | TGetTasksSuccess
  | TGetTasksFailure
  | TGetSingleTaskStart
  | TGetSingleTaskSuccess
  | TGetSingleTaskFailure
  | TCreateTaskStart
  | TCreateTaskSuccess
  | TCreateTaskFailure
  | TEditTaskStart
  | TEditTaskSuccess
  | TEditTaskFailure
  | TDeleteTaskStart
  | TDeleteTaskSuccess
  | TDeleteTaskFailure;

// Visit
export type TGetVisitsStart = {
  type: ACTION_TYPES.GET_VISITS_START;
};
export type TGetVisitsSuccess = {
  type: ACTION_TYPES.GET_VISITS_SUCCESS;
  payload: any;
};
export type TGetVisitsFailure = {
  type: ACTION_TYPES.GET_VISITS_FAILURE;
  payload?: any;
};
export type TVisitAction = TGetVisitsStart | TGetVisitsSuccess | TGetVisitsFailure;

//Partner
export type TGetPartnersStart = {
  type: ACTION_TYPES.GET_PARTNERS_START;
};
export type TGetPartnersSuccess = {
  type: ACTION_TYPES.GET_PARTNERS_SUCCESS;
  payload: any;
};
export type TGetPartnersFailure = {
  type: ACTION_TYPES.GET_PARTNERS_FAILURE;
  payload?: any;
};
export type TPartnerAction = TGetPartnersStart | TGetPartnersSuccess | TGetPartnersFailure;

//Agent
export type TGetAgentsStart = {
  type: ACTION_TYPES.GET_AGENTS_START;
};
export type TGetAgentsSuccess = {
  type: ACTION_TYPES.GET_AGENTS_SUCCESS;
  payload: any;
};
export type TGetAgentsFailure = {
  type: ACTION_TYPES.GET_AGENTS_FAILURE;
  payload?: any;
};
export type TAgentAction = TGetAgentsStart | TGetAgentsSuccess | TGetAgentsFailure;

//Payment
export type TGetPaymentsStart = {
  type: ACTION_TYPES.GET_PAYMENTS_START;
};
export type TGetPaymentsSuccess = {
  type: ACTION_TYPES.GET_PAYMENTS_SUCCESS;
  payload: any;
};
export type TGetPaymentsFailure = {
  type: ACTION_TYPES.GET_PAYMENTS_FAILURE;
  payload?: any;
};
export type TPaymentAction = TGetPaymentsStart | TGetPaymentsSuccess | TGetPaymentsFailure;

export type TGetVisitTypesSuccess = {
  type: ACTION_TYPES.GET_VISIT_TYPES_SUCCESS;
  payload: VisitType[];
};
export type TGetVisitStatusesSuccess = {
  type: ACTION_TYPES.GET_VISIT_STATUSES_SUCCESS;
  payload: VisitStatus[];
};
export type TGetTasktStatusesSuccess = {
  type: ACTION_TYPES.GET_TASK_STATUSES_SUCCESS;
  payload: TaskStatus[];
};
export type TGetCommonPrioritiesSuccess = {
  type: ACTION_TYPES.GET_COMMON_PRIORITIES_SUCCESS;
  payload: VisitType[];
};
export type TGetRelationDegreeSuccess = {
  type: ACTION_TYPES.GET_RELATION_DEGREE_SUCCESS;
  payload: VisitType[];
};
export type TGetVisitPlacesSuccess = {
  type: ACTION_TYPES.GET_VISIT_PLACES_SUCCESS;
  payload: VisitPlace[];
};
export type TGetClinicsSuccess = {
  type: ACTION_TYPES.GET_CLINICS_SUCCESS;
  payload: Clinic[];
};
export type TGetPatientSourcesSuccess = {
  type: ACTION_TYPES.GET_PATIENT_SOURCES_SUCCESS;
  payload: VisitType[];
};
export type TGetPatientTagsSuccess = {
  type: ACTION_TYPES.GET_PATIENT_TAGS_SUCCESS;
  payload: PatientTag[];
};
export type TGetOperationsTypesSuccess = {
  type: ACTION_TYPES.GET_OPERATIONS_TYPES_SUCCESS;
  payload: VisitType[];
};
export type TGetDiagnosesSuccess = {
  type: ACTION_TYPES.GET_DIAGNOSES_SUCCESS;
  payload: VisitType[];
};
export type TGetLocalizationSuccess = {
  type: ACTION_TYPES.GET_LOCALIZATION_SUCCESS;
  payload: VisitType[];
};
export type TGeMkbSuccess = {
  type: ACTION_TYPES.GET_MKB_SUCCESS;
  payload: MKB[];
};
export type TGetCitiesSuccess = {
  type: ACTION_TYPES.GET_CITIES_SUCCESS;
  payload: City[];
};

export type TDirectoriesAction =
  | TGetVisitTypesSuccess
  | TGetVisitStatusesSuccess
  | TGetTasktStatusesSuccess
  | TGetCommonPrioritiesSuccess
  | TGetRelationDegreeSuccess
  | TGetVisitPlacesSuccess
  | TGetClinicsSuccess
  | TGetPatientSourcesSuccess
  | TGetPatientTagsSuccess
  | TGetOperationsTypesSuccess
  | TGetDiagnosesSuccess
  | TGetLocalizationSuccess
  | TGeMkbSuccess
  | TGetCitiesSuccess;

// User
export type TGetUsersStart = {
  type: ACTION_TYPES.GET_USERS_START;
};
export type TGetUsersSuccess = {
  type: ACTION_TYPES.GET_USERS_SUCCESS;
  payload: any;
};
export type TGetUsersFailure = {
  type: ACTION_TYPES.GET_USERS_FAILURE;
  payload?: any;
};
export type TUserAction = TGetUsersStart | TGetUsersSuccess | TGetUsersFailure;
