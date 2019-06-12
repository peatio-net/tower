import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import { buildQueryString } from '../../../../helpers';
import {alertPush} from '../../../alert';
import {
    GetUsersWithPendingDocuments,
    getUsersWithPendingDocumentsData,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* getUsersWithPendingDocumentsSaga(action: GetUsersWithPendingDocuments) {
    try {
        const params = buildQueryString(action.payload);
        const users = yield call(API.get(requestOptions), `/admin/users/documents/pending?extended=true&${params}`);
        yield put(getUsersWithPendingDocumentsData({ users: users.data, total: users.headers.total }));

    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
