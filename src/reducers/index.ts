import { combineReducers } from 'redux';

import { visitReducer } from './VisitReducer';
import { partnerReducer } from './PartnerReducer';
import { agentReducer } from './AgentReducer';
import { paymentReducer } from './PaymentReducer';
import { userReducer } from './UserReducer';
import { AdditionalReducer } from './Additional';

const reducer = combineReducers({
  visit: visitReducer,
  partner: partnerReducer,
  agent: agentReducer,
  payment: paymentReducer,
  user: userReducer,
});

export default reducer;
