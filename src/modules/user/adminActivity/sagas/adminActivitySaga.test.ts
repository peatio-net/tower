import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { rootSaga } from '../../../index';
import { adminActivityData, getAdminActivity } from '../actions';

const debug = false;

describe('Admin activity', () => {
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

    describe('Fetch admin activity data', () => {
        const payload = [
            {
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: '{"path":"api/v2/barong/resource/users/me"}',
                result: 'succeed',
                topic: 'session',
                admin: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                target: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
            {
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: null,
                result: 'succeed',
                topic: 'session',
                admin: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                target: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
        ];

        const parsedPayload = [
            {
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: [{ type: 'key', value: 'path'}, { type: 'value', value: 'api/v2/barong/resource/users/me' }],
                result: 'succeed',
                topic: 'session',
                admin: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                target: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
            {
                action: 'login',
                created_at: '2019-01-22T15:08:36.000Z',
                data: [],
                result: 'succeed',
                topic: 'session',
                admin: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                target: {
                    email: 'admin@barong.io',
                    level: 3,
                    otp: false,
                    state: 'active',
                    uid: 'ID873B710D88',
                    role: 'admin',
                },
                user_ip: '195.214.197.210',
                user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },
        ];

        const fakeHeaders = { total: 1 };

        const fakeSuccessPayloadFirstPage = { list: parsedPayload, page: 1, total: fakeHeaders.total };
        const fakeFetchPayloadFirstPage = { page: 1, limit: 2 };

        const mockAdminActivityFetch = () => {
            mockAxios.onGet('/admin/activities/admin?page=1&limit=2').reply(200, payload, fakeHeaders);
        };

        const expectedActionsFetchWithFirstPage = [
            getAdminActivity(fakeFetchPayloadFirstPage),
            adminActivityData(fakeSuccessPayloadFirstPage),
        ];

        it('should fetch user activity for 1 page in success flow', async () => {
            mockAdminActivityFetch();

            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedActionsFetchWithFirstPage.length) {
                        expect(actions).toEqual(expectedActionsFetchWithFirstPage);
                        resolve();
                    }
                });
            });
            store.dispatch(getAdminActivity(fakeFetchPayloadFirstPage));
            return promise;
        });
    });
});
