import { takeLatest } from 'redux-saga/effects';
import {
    WITHDRAWS_INFO_FETCH,
} from '../../constants';
import { getWithdrawInfoSaga } from './handleGetWithdrawInfoSaga';

export function* rootGetWithdrawInfoSaga() {
    yield takeLatest(WITHDRAWS_INFO_FETCH, getWithdrawInfoSaga);
}
