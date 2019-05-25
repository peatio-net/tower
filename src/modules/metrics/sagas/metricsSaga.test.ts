import MockAdapter from 'axios-mock-adapter';
import {MockStoreEnhanced} from 'redux-mock-store';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';
import {mockNetworkError, setupMockAxios, setupMockStore} from '../../../helpers';
import {alertData, alertDelete, alertPush, rootSaga} from '../../index';
import {metricsData, metricsFetch} from '../actions';

describe('Metrics saga', () => {
    let mockAxios: MockAdapter;
    let sagaMiddleware: SagaMiddleware<{}>;
    let store: MockStoreEnhanced;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, false)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const metrics = {
        signups: {
            '2019-05-24': 3,
        },
        sucessful_logins: {
            '2019-05-23': 1,
            '2019-05-24': 2,
        },
        failed_logins: {
            '2019-05-22': 1,
            '2019-05-23': 1,
            '2019-05-24': 3,
        },
        pending_applications: 1529,
    };

    const mockMetricsFetch = () => {
        mockAxios.onGet('/admin/metrics').reply(200, metrics);
    };

    it('should get metrics', async () => {
        const expectedActionsFetch = [
            metricsFetch(),
            metricsData({metrics}),
        ];

        mockMetricsFetch();

        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(metricsFetch());
        return promise;
    });

    it('should handle network error', async () => {
        const expectedActionsNetworkError = [
            metricsFetch(),
            alertPush({
                code: 500,
                message: ['Server error'],
                type: 'error',
            }),
            alertData({
                code: 500,
                message: ['Server error'],
                type: 'error',
            }),
            alertDelete(),
        ];

        mockNetworkError(mockAxios);

        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsNetworkError.length) {
                    expect(actions).toEqual(expectedActionsNetworkError);
                    resolve();
                }
            });
        });

        store.dispatch(metricsFetch());
        return promise;
    });
});
