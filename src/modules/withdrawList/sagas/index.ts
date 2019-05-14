import { takeLatest } from 'redux-saga/effects';
import {
    WITHDRAWS_LIST_FETCH,
} from '../../constants';
import { getWithdrawListSaga } from './handleGetWithdrawListSaga';

export function* rootGetWithdrawListSaga() {
    yield takeLatest(WITHDRAWS_LIST_FETCH, getWithdrawListSaga);
}
