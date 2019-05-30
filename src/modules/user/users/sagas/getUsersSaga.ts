import { call, put } from 'redux-saga/effects';
import { alertPush } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';
import {
    GetDataByFilterFetch,
    GetUsersByLabelFetch,
    getUsersData,
    GetUsersFetch,
} from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* getUsersSaga(action: GetUsersFetch) {
    try {
        const params = buildQueryString(action.payload);
        const users = yield call(API.get(requestOptions), `/admin/users?${params}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* getUsersSagaSearch(action: GetDataByFilterFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(requestOptions), `/admin/users/search?field=${action.payload.field}&value=${action.payload.value}&page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* getUsersSagaLabelsSearch(action: GetUsersByLabelFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(requestOptions), `/admin/users/labels?key=${action.payload.key}&value=${action.payload.value}&page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
