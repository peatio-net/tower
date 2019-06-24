import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
    alertData,
    alertDelete,
    alertPush,
    currentUserReset,
    rootSaga,
} from '../../';
import {
    mockNetworkError,
    setupMockAxios,
    setupMockStore,
} from '../../../helpers';
import {
    logout,
    signInRequire2FA,
} from '../actions';

describe('Login saga', () => {
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

    const mockLogout = () => {
        mockAxios.onDelete('/identity/sessions').reply(200);
    };

    const expectedActionsFetch = [
        logout(),
        currentUserReset(),
        signInRequire2FA({ require2fa: false }),
    ];

    const expectedActionsNetworkError = [
        logout(),
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

    it('should logout user in success flow', async () => {
        mockLogout();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(logout());
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
        store.dispatch(logout());
        return promise;
    });
});
