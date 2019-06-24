import {takeLatest} from 'redux-saga/effects';
import {
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_BY_LABELS_FETCH,
    GET_USERS_FETCH, GET_USERS_PENDING_DOCUMENTS_FETCH,
} from '../../../constants';
import {
    getUsersSaga,
    getUsersSagaLabelsSearch,
    getUsersSagaSearch,
} from './getUsersSaga';
import {getUsersWithPendingDocumentsSaga} from './getUsersWithPendingDocuments';


export function* rootUsersSaga() {
    yield takeLatest(GET_USERS_FETCH, getUsersSaga);
    yield takeLatest(GET_DATA_BY_FILTER_FETCH, getUsersSagaSearch);
    yield takeLatest(GET_USERS_BY_LABELS_FETCH, getUsersSagaLabelsSearch);
    yield takeLatest(GET_USERS_PENDING_DOCUMENTS_FETCH, getUsersWithPendingDocumentsSaga);
}
