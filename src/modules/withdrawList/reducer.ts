import {
    WITHDRAWS_LIST_DATA,
    WITHDRAWS_LIST_FETCH,
} from '../constants';
import { WithdrawListItemInterface, WithdrawsListAction } from './actions';

export interface WithdrawsListState {
    list: WithdrawListItemInterface[];
    loading: boolean;
}

export const initialWithdrawsListState: WithdrawsListState = {
    list: [],
    loading: false,
};

export const withdrawsListReducer = (state = initialWithdrawsListState, action: WithdrawsListAction) => {
    switch (action.type) {
      case WITHDRAWS_LIST_FETCH:
          return {
              list: [],
              loading: true,
          };
      case WITHDRAWS_LIST_DATA:
          return {
              list: action.payload,
              loading: false,
          };
      default:
          return {
              ...state,
          };
    }
};
