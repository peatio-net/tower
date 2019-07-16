import { call, put } from 'redux-saga/effects';
import {
    alertPush,
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString, jsonToArray } from '../../../../helpers';
import { adminActivityData, AdminActivityFetch } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* adminActivitySaga(action: AdminActivityFetch) {
    try {
        const { page } = action.payload;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/activities/admin?${params}`);

        for (const i of data) {
            i.data = jsonToArray(JSON.parse(i.data) || {});
        }

        yield put(adminActivityData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
