import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getUserDataSuccess,
    UserDataFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* getUserDataSaga(action: UserDataFetch) {
    try {
        const user = yield call(API.get(requestOptions), `/admin/users/${action.payload.uid}`);
        yield put(getUserDataSuccess(user.data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
