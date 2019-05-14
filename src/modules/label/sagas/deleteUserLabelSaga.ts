import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    DeleteUserLabelFetch,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* deleteUserLabelSaga(action: DeleteUserLabelFetch) {
    try {
        yield call(API.delete(requestOptions), `/admin/users/labels?uid=${action.payload.uid}&key=${action.payload.key}&scope=${action.payload.scope}`);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
