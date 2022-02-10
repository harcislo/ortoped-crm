import ACTION_TYPES from '../types/actionNames';
import { TUserAction } from '../types';

interface IUserState {
  users: any[];
  loading: boolean;
}

const initialState: IUserState = {
  users: [],
  loading: false,
};

export const userReducer = (state: IUserState = initialState, action: TUserAction): IUserState => {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
