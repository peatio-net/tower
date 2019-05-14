import { call, put } from 'redux-saga/effects';
import {
    AddUserLabelFetch,
    alertPush,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* addUserLabelSaga(action: AddUserLabelFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/users/labels`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
