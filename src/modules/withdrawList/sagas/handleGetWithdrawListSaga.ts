import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getWithdrawsListData,
    WithdrawsListFetch,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* getWithdrawListSaga(action: WithdrawsListFetch) {
    try {
        const response = yield call(API.get(requestOptions), '/admin/withdraws/pending');
        yield put(getWithdrawsListData(response.data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
