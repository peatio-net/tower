import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../../';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../../helpers';
import {
    alertData,
    alertDelete,
    alertPush,
} from '../../../alert';
import {
    getUsers,
    getUsersData,
} from '../actions';

describe('GetUsersData saga', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, false)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeCredentials = {
        page: 1,
        limit: 10,
        extended: true,
    };

    const fakeUserResponce = [{
        created_at: '',
        email: '',
        id: 0,
        level: 0,
        otp: false,
        role: '',
        state: '',
        uid: '123',
        updated_at: '',
        profile: {
            uid: '123',
            first_name: '',
            last_name: '',
            dob: '',
            address: '',
            metadata: {
                nationality: '',
            },
            postcode: '',
            city: '',
            country: '',
            created_at: '',
            updated_at: '',
        },
    }];

    const fakeHeaders = { total: 1 };

    const mockGetUsersData = () => {
        mockAxios.onGet(`/admin/users?page=1&limit=10&extended=true`).reply(200, fakeUserResponce, fakeHeaders);
    };

    const expectedActionsFetch = [
        getUsers(fakeCredentials),
        getUsersData({ users: fakeUserResponce, total: 1}),
    ];

    const expectedActionsNetworkError = [
        getUsers(fakeCredentials),
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

    it('should get users in success flow', async () => {
        mockGetUsersData();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(getUsers(fakeCredentials));
        return promise;
    });

    it('should trigger network error', async () => {
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
        store.dispatch(getUsers(fakeCredentials));
        return promise;
    });
});
