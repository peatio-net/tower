import { call, put } from 'redux-saga/effects';
import { LogoutFetch, signInRequire2FA } from '../';
import { alertPush, currentUserReset } from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* logoutSaga(action: LogoutFetch) {
    try {
        yield call(API.delete(requestOptions), '/identity/sessions');
        yield put(currentUserReset());
        yield put(signInRequire2FA({ require2fa: false }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
