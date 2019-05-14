import { AppState, WithdrawsUserHistoryState } from '../';

export const selectWithdrawUserHistoryData = (state: AppState): WithdrawsUserHistoryState['history'] =>
    state.withdrawUserHistory.history;
