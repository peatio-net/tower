import {call, put} from 'redux-saga/effects';
import {API} from '../../../api';
import {alertPush} from '../../alert';
import {metricsData} from '../actions';

export function* metricsSaga() {
    try {
        const metrics = yield call(API.get(), '/admin/metrics');
        yield put(metricsData({metrics: metrics.data}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
