import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    ChangeUserOTPFetch,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* changeUserOTPSaga(action: ChangeUserOTPFetch) {
    try {
        yield call(API.put(requestOptions), `/admin/users`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({
            message: error.message,
            code: error.code,
            type: 'error',
        }));
    }
}
