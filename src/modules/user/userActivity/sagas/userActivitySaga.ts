import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    userActivityData,
    UserActivityFetch,
} from '../../../';
import { API } from '../../../../api';

export function* userActivitySaga(action: UserActivityFetch) {
    try {
        const { page, limit } = action.payload;
        const { data, headers } = yield call(API.get(), `/admin/activities?limit=${limit}&page=${page + 1}`);
        yield put(userActivityData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
