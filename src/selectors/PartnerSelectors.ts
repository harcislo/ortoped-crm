import { RootState } from '../store';

export const getPartnersSelector = (state: RootState) => state.partner.partners;
