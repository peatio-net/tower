import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { rootSaga } from '../../../index';
import { getUserActivity } from '../actions';

const debug = false;

describe('User activity', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, debug)();
        sagaMiddleware.run(rootSaga);
    });

    describe('Fetch user activity data', () => {
        const payload = [
            {
                id: 1,
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: null,
                result: 'succeed',
                topic: 'session',
                user: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
        ];

        const fakeHeaders = { total: 1 };

        const fakeFetchPayloadFirstPage = { page: 1, limit: 2 };

        const mockUserActivityFetch = () => {
            mockAxios.onGet('/admin/activities?page=1&limit=2').reply(200, payload, fakeHeaders);
        };

        const expectedActionsFetchWithFirstPage = [
            getUserActivity(fakeFetchPayloadFirstPage),
        ];

        it('should fetch user activity for 1 page in success flow', async () => {
            mockUserActivityFetch();

            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedActionsFetchWithFirstPage.length) {
                        expect(actions).toEqual(expectedActionsFetchWithFirstPage);
                        resolve();
                    }
                });
            });
            store.dispatch(getUserActivity(fakeFetchPayloadFirstPage));
            return promise;
        });
    });

    describe('Fetch user activity data for specific user', () => {
        const payload = [
            {
                id: 1,
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: null,
                result: 'succeed',
                topic: 'session',
                user: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
        ];

        const fakeHeaders = { total: 1 };

        const fakeFetchPayloadFirstPage = { page: 1, limit: 2, uid: 'ID873B710D88' };

        const mockUserActivityFetch = () => {
            mockAxios.onGet('/admin/activities?page=1&limit=2&uid=ID873B710D88').reply(200, payload, fakeHeaders);
        };

        const expectedActionsFetchWithFirstPage = [
            getUserActivity(fakeFetchPayloadFirstPage),
        ];

        it('should fetch user activity for 1 page in success flow', async () => {
            mockUserActivityFetch();

            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedActionsFetchWithFirstPage.length) {
                        expect(actions).toEqual(expectedActionsFetchWithFirstPage);
                        resolve();
                    }
                });
            });
            store.dispatch(getUserActivity(fakeFetchPayloadFirstPage));
            return promise;
        });
    });
});
