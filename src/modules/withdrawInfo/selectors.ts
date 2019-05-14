import { AppState, WithdrawsInfoState } from '../';

export const selectWithdrawInfoData = (state: AppState): WithdrawsInfoState['info'] =>
    state.withdrawInfo.info;
