import {
    WITHDRAWS_INFO_DATA,
    WITHDRAWS_INFO_FETCH,
} from '../constants';

export interface WithdrawInfoInterface {
    account_number: number;
    address: string;
    amount: number;
    bank_address: string;
    bank_country: string;
    bank_name: string;
    bank_swift_code: number;
    country: string;
    currency: string;
    date: string;
    email: string;
    intermediary_bank_address: string;
    intermediary_bank_country: string;
    intermediary_bank_name: string;
    intermediary_bank_swift_code: number;
    name: string;
    rid: number;
    state: string;
    uid: string;
}

export interface WithdrawsInfoFetch {
    type: typeof WITHDRAWS_INFO_FETCH;
    payload: string;
}

interface WithdrawsInfoData {
    type: typeof WITHDRAWS_INFO_DATA;
    payload: WithdrawInfoInterface;
}

export type WithdrawsInfoAction = WithdrawsInfoFetch | WithdrawsInfoData;

export const getWithdrawsInfo = (payload: WithdrawsInfoFetch['payload']): WithdrawsInfoFetch => ({
    type: WITHDRAWS_INFO_FETCH,
    payload,
});

export const getWithdrawsInfoData = (payload: WithdrawsInfoData['payload']): WithdrawsInfoData => ({
    type: WITHDRAWS_INFO_DATA,
    payload,
});
