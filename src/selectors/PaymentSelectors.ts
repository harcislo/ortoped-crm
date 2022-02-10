import { RootState } from '../store';

export const getPaymentsSelector = (state: RootState) => state.payment.payments;
