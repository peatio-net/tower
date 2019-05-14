import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../api';
import { alertPush } from '../../alert';
import { metricsData } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* metricsSaga() {
    try {
        const metrics = yield call(API.get(requestOptions), '/admin/metrics');
        yield put(metricsData({ metrics: metrics.data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}
