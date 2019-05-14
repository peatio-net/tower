import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getWithdrawsInfoData,
    WithdrawsInfoFetch,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getWithdrawInfoSaga(action: WithdrawsInfoFetch) {
    try {
        const response = yield call(API.get(requestOptions), `/admin/withdraws/pending/${action.payload}`);
        yield put(getWithdrawsInfoData(response.data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
