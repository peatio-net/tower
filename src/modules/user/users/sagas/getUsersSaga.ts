import { call, put } from 'redux-saga/effects';
import { alertPush } from '../../../';
import { API } from '../../../../api';
import {
    GetDataByFilterFetch,
    GetUsersByLabelFetch,
    getUsersData,
    GetUsersFetch,
} from '../actions';

export function* getUsersSaga(action: GetUsersFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(), `/admin/users?page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* getUsersSagaSearch(action: GetDataByFilterFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(), `/admin/users/search?field=${action.payload.field}&value=${action.payload.value}&page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* getUsersSagaLabelsSearch(action: GetUsersByLabelFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(), `/admin/users/labels?key=${action.payload.key}&value=${action.payload.value}&page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
