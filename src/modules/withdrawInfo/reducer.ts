import {
    WITHDRAWS_INFO_DATA,
    WITHDRAWS_INFO_FETCH,
} from '../constants';
import { WithdrawInfoInterface, WithdrawsInfoAction } from './actions';

export interface WithdrawsInfoState {
    info?: WithdrawInfoInterface;
    loading: boolean;
}

export const initialWithdrawsInfoState: WithdrawsInfoState = {
    loading: false,
};

export const withdrawsInfoReducer = (state = initialWithdrawsInfoState, action: WithdrawsInfoAction) => {
    switch (action.type) {
      case WITHDRAWS_INFO_FETCH:
          return {
              info: undefined,
              loading: true,
          };
      case WITHDRAWS_INFO_DATA:
          return {
              info: action.payload,
              loading: false,
          };
      default:
          return {
              ...state,
          };
    }
};
