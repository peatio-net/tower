import {
    WITHDRAWS_LIST_DATA,
    WITHDRAWS_LIST_FETCH,
} from '../constants';

export interface WithdrawListItemInterface {
    uid: string;
    email: string;
    date: string;
    amount: string;
    currency: string;
    status: string;
}

export interface WithdrawsListFetch {
    type: typeof WITHDRAWS_LIST_FETCH;
}

interface WithdrawsListData {
    type: typeof WITHDRAWS_LIST_DATA;
    payload: WithdrawListItemInterface[];
}

export type WithdrawsListAction = WithdrawsListFetch | WithdrawsListData;

export const getWithdrawsList = (): WithdrawsListFetch => ({
    type: WITHDRAWS_LIST_FETCH,
});

export const getWithdrawsListData = (payload: WithdrawsListData['payload']): WithdrawsListData => ({
    type: WITHDRAWS_LIST_DATA,
    payload,
});
