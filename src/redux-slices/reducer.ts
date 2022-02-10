import { combineReducers } from 'redux';

import { visitReducer } from '../reducers/VisitReducer';
import { partnerReducer } from '../reducers/PartnerReducer';
import { agentReducer } from '../reducers/AgentReducer';
import { paymentReducer } from '../reducers/PaymentReducer';
import { userReducer } from '../reducers/UserReducer';

import patientReducer from './PatientSlice';
import authReducer from './AuthSlice';
import taskReducer from './TaskSlice';
import directoriesReducer from './DirectoriesSlice';
import { AdditionalReducer } from '../reducers/Additional';
import appSlice from './AppSlice';

const reducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  task: taskReducer,
  visit: visitReducer,
  partner: partnerReducer,
  agent: agentReducer,
  payment: paymentReducer,
  directories: directoriesReducer,
  user: userReducer,
  additional: AdditionalReducer,

  app: appSlice,
});

export default reducer;
