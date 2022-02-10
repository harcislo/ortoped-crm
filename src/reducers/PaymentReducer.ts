import ACTION_TYPES from '../types/actionNames';
import { TPaymentAction } from '../types';

interface IPaymentState {
  payments: any[];
  payers: any[];
  loading: boolean;
  pageCount:number,
  currentPage: number,
  totalCount: number,
  perPage:number
  selectedRowKeys: Array<number>

}

const initialState: IPaymentState = {
  payments: [],
  payers: [],
  loading: false,
  pageCount:0,
  currentPage: 0,
  totalCount: 0,
  perPage:0,
  selectedRowKeys: [],
};

export const paymentReducer = (
  state: IPaymentState = initialState,
  action: TPaymentAction
): IPaymentState => {
  switch (action.type) {
    case ACTION_TYPES.GET_PAYMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
