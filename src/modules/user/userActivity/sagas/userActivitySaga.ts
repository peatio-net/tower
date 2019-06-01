import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    userActivityData,
    UserActivityFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* userActivitySaga(action: UserActivityFetch) {
    try {
        const { page } = action.payload;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/activities?${params}`);
        yield put(userActivityData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
