import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../helpers';
import {
    alertData,
    alertDelete,
    alertPush,
} from '../../alert';
import {
    getWithdrawsList,
    getWithdrawsListData,
} from '../actions';

describe('WithdrawsList saga', () => {
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

    const fakeWithdrawListResponse = [
        {
            uid: '1234567890AD',
            email: 'admin@admin.fr',
            date: '18-06-20 17:38:42',
            amount: '2000',
            currency: 'USD',
            status: 'Pending',
        },
        {
            uid: '1234567890AD',
            email: 'admin@admin.fr',
            date: '18-06-20 17:38:42',
            amount: '2000',
            currency: 'USD',
            status: 'Agreed',
        },
        {
            uid: '1234567890AD',
            email: 'admin@st.net',
            date: '18-06-20 17:38:42',
            amount: '2000',
            currency: 'USD',
            status: 'Canceled',
        },
    ];

    const mockGetUserData = () => {
        mockAxios.onGet(`/admin/withdraws/pending`).reply(200, fakeWithdrawListResponse);
    };

    const expectedActionsFetch = [
        getWithdrawsList(),
        getWithdrawsListData(fakeWithdrawListResponse),
    ];

    const expectedActionsNetworkError = [
        getWithdrawsList(),
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

    it('should get user data in success flow', async () => {
        mockGetUserData();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(getWithdrawsList());
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
        store.dispatch(getWithdrawsList());
        return promise;
    });
});
