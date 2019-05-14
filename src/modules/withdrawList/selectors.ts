import { AppState, WithdrawsListState } from '../';

export const selectWithdrawListData = (state: AppState): WithdrawsListState['list'] =>
    state.withdrawList.list;
