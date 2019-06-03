import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
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
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(requestOptions), `/admin/users/documents/pending?extended=true&limit=${limit}&page=${page}`);
        yield put(getUsersWithPendingDocumentsData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
