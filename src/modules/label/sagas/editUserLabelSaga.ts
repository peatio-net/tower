import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    EditUserLabelFetch,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* editUserLabelSaga(action: EditUserLabelFetch) {
    try {
        yield call(API.put(requestOptions), `/admin/users/labels`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
