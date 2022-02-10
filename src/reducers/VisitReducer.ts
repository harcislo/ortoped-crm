import ACTION_TYPES from '../types/actionNames';
import { TVisitAction } from '../types';

interface IVisitState {
  visits: any[];
  loading: boolean;
}

const initialState: IVisitState = {
  visits: [],
  loading: false,
};

export const visitReducer = (
  state: IVisitState = initialState,
  action: TVisitAction
): IVisitState => {
  switch (action.type) {
    case ACTION_TYPES.GET_VISITS_START:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_VISITS_SUCCESS:
      return {
        ...state,
        visits: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_VISITS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
