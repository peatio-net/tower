import { takeLatest } from 'redux-saga/effects';
import {
    WITHDRAWS_USER_HISTORY_FETCH,
} from '../../constants';
import { getWithdrawUserHistorySaga } from './handleGetWithdrawUserHistorySaga';

export function* rootGetWithdrawUserHistorySaga() {
    yield takeLatest(WITHDRAWS_USER_HISTORY_FETCH, getWithdrawUserHistorySaga);
}
