import { call, put } from 'redux-saga/effects';
import { logoutData, LogoutFetch } from '../';
import { alertPush } from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* logoutSaga(action: LogoutFetch) {
    try {
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        window.location.replace('/tower/login');
        yield call(API.delete(requestOptions), '/identity/sessions');
        yield put(logoutData());
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
