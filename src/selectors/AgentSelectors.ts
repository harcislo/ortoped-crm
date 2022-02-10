import { RootState } from '../store';

export const getAgentsSelector = (state: RootState) => state.agent.agents;
