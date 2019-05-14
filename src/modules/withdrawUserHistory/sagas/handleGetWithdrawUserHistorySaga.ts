import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getWithdrawUserHistoryData,
    WithdrawUserHistoryFetch,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getWithdrawUserHistorySaga(action: WithdrawUserHistoryFetch) {
    try {
        const response = yield call(API.get(requestOptions), `/admin/withdraws?uid=${action.payload.uid}`);
        yield put(getWithdrawUserHistoryData(response.data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
