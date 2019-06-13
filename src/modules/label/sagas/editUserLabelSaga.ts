import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    EditUserLabelFetch,
    filterUsersWithVerifiedDocuments,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* editUserLabelSaga(action: EditUserLabelFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/users/labels/update`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));

        const {key, value} = action.payload;
        if (key === 'document' && value === 'verified') {
            yield put(filterUsersWithVerifiedDocuments({uid: action.payload.uid}));
        }
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
