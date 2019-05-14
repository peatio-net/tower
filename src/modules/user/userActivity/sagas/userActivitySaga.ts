import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    userActivityData,
    UserActivityFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* userActivitySaga(action: UserActivityFetch) {
    try {
        const { page, limit } = action.payload;
        const { data, headers } = yield call(API.get(requestOptions), `/admin/activities?limit=${limit}&page=${page + 1}`);
        yield put(userActivityData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
