import { call, put } from 'redux-saga/effects';
import {
    LoginFetch,
    logout,
    signInRequire2FA,
} from '../';
import { alertPush, getCurrentUserData } from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* loginSaga(action: LoginFetch) {
    try {
        const user = yield call(API.post(requestOptions), '/identity/sessions', action.payload);
        if (['admin', 'superadmin', 'accountant', 'compliance', 'support'].includes(user.data.role)) {
            yield put(getCurrentUserData(user.data));
        } else {
            yield put(logout());
        }
    } catch (error) {
        const responseStatus = error.code;
        const is2FAEnabled = responseStatus === 403;

        if (is2FAEnabled) {
            yield put(signInRequire2FA({ require2fa: true }));
        } else {
            yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
        }
    }
}
