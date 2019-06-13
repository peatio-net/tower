// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { ADMIN_ACTIVITY_FETCH } from '../../../constants';
import { adminActivitySaga } from './adminActivitySaga';

export function* rootAdminActivitySaga() {
    yield takeEvery(ADMIN_ACTIVITY_FETCH, adminActivitySaga);
}
