import { WithdrawListItemInterface } from '../';
import {
    WITHDRAWS_USER_HISTORY_DATA,
    WITHDRAWS_USER_HISTORY_FETCH,
} from '../constants';

export interface WithdrawUserHistoryFetch {
    type: typeof WITHDRAWS_USER_HISTORY_FETCH;
    payload: {
        uid: string;
    };
}

interface WithdrawUserHistoryData {
    type: typeof WITHDRAWS_USER_HISTORY_DATA;
    payload: WithdrawListItemInterface[];
}

export type WithdrawUserHistoryAction = WithdrawUserHistoryFetch | WithdrawUserHistoryData;

export const getWithdrawUserHistory = (payload: WithdrawUserHistoryFetch['payload']): WithdrawUserHistoryFetch => ({
    type: WITHDRAWS_USER_HISTORY_FETCH,
    payload,
});

export const getWithdrawUserHistoryData = (payload: WithdrawUserHistoryData['payload']): WithdrawUserHistoryData => ({
    type: WITHDRAWS_USER_HISTORY_DATA,
    payload,
});
