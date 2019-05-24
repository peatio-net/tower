import { call, put } from 'redux-saga/effects';
import { logoutData, LogoutFetch } from '../';
import { alertPush, getCurrentUserError } from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* logoutSaga(action: LogoutFetch) {
    try {
        yield call(API.delete(requestOptions), '/identity/sessions');
        yield put(logoutData());
        yield put(getCurrentUserError());
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
