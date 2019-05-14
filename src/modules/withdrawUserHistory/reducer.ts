import { WithdrawListItemInterface } from '../';
import {
    WITHDRAWS_USER_HISTORY_DATA,
    WITHDRAWS_USER_HISTORY_FETCH,
} from '../constants';
import { WithdrawUserHistoryAction } from './actions';

export interface WithdrawsUserHistoryState {
    history: WithdrawListItemInterface[];
    loading: boolean;
}

export const initialWithdrawsUserHistoryState: WithdrawsUserHistoryState = {
    history: [],
    loading: false,
};

export const withdrawsUserHistoryReducer = (state = initialWithdrawsUserHistoryState, action: WithdrawUserHistoryAction) => {
    switch (action.type) {
      case WITHDRAWS_USER_HISTORY_FETCH:
          return {
              history: [],
              loading: true,
          };
      case WITHDRAWS_USER_HISTORY_DATA:
          return {
              history: action.payload,
              loading: false,
          };
      default:
          return {
              ...state,
          };
    }
};
