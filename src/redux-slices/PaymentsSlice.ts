import { RootState } from '../store';
import { Pagination } from '../types';

export const getPaymentPagination = (state: RootState): Pagination => {
  return {
    pageCount: state.task.pageCount,
    currentPage: state.task.currentPage,
    totalCount: state.payment.payments.length,
    perPage: state.task.perPage,
  };
};