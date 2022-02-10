import ACTION_TYPES from '../types/actionNames';
import { TAgentAction } from '../types';

interface IAgentState {
  agents: any[];
  loading: boolean;
}

const initialState: IAgentState = {
  agents: [],
  loading: false,
};

export const agentReducer = (
  state: IAgentState = initialState,
  action: TAgentAction
): IAgentState => {
  switch (action.type) {
    case ACTION_TYPES.GET_AGENTS_START:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_AGENTS_SUCCESS:
      return {
        ...state,
        agents: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_AGENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
