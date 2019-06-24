import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    ChangeUserRoleFetch,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* changeUserRoleSaga(action: ChangeUserRoleFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/users/role`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({
            message: error.message,
            code: error.code,
            type: 'error',
        }));
    }
}
