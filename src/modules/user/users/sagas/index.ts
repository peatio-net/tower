import {takeLatest} from 'redux-saga/effects';
import {
    GET_CURRENT_USER_FETCH,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_BY_LABELS_FETCH,
    GET_USERS_FETCH, GET_USERS_PENDING_DOCUMENTS_FETCH,
} from '../../../constants';
import {getCurrentUserSaga} from './getCurrentUserSaga';
import {
    getUsersSaga,
    getUsersSagaLabelsSearch,
    getUsersSagaSearch,
} from './getUsersSaga';
import {getUsersWithPendingDocumentsSaga} from './getUsersWithPendingDocuments';


export function* rootUsersSaga() {
    yield takeLatest(GET_USERS_FETCH, getUsersSaga);
    yield takeLatest(GET_CURRENT_USER_FETCH, getCurrentUserSaga);
    yield takeLatest(GET_DATA_BY_FILTER_FETCH, getUsersSagaSearch);
    yield takeLatest(GET_USERS_BY_LABELS_FETCH, getUsersSagaLabelsSearch);
    yield takeLatest(GET_USERS_PENDING_DOCUMENTS_FETCH, getUsersWithPendingDocumentsSaga);
}
