import ACTION_TYPES from '../types/actionNames';
import { TPartnerAction } from '../types';

interface IPartnerState {
  partners: any[];
  loading: boolean;
}

const initialState: IPartnerState = {
  partners: [],
  loading: false,
};

export const partnerReducer = (
  state: IPartnerState = initialState,
  action: TPartnerAction
): IPartnerState => {
  switch (action.type) {
    case ACTION_TYPES.GET_PARTNERS_START:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_PARTNERS_SUCCESS:
      return {
        ...state,
        partners: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_PARTNERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
