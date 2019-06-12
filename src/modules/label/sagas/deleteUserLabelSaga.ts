import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    DeleteUserLabelFetch,
    filterUsersWithVerifiedDocuments,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* deleteUserLabelSaga(action: DeleteUserLabelFetch) {
    try {
        const params = buildQueryString(action.payload);
        yield call(API.delete(requestOptions), `/admin/users/labels?${params}`);
        yield put(getUserData({uid: action.payload.uid}));

        const { key } = action.payload;
        if (key === 'document') {
            yield put(filterUsersWithVerifiedDocuments({ uid: action.payload.uid }));
        }

    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
