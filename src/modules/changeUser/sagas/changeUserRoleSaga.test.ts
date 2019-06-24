import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { getUserData, rootSaga } from '../../';
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
    changeUserRole,
} from '../actions';

describe('ChangeUserRole saga', () => {
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

    const mockChangeUserRole = () => {
        mockAxios.onPost('/admin/users/role').reply(200);
    };

    const fakeCredentials = {
        uid: '',
        role: '',
    };

    const expectedActionsFetch = [
        changeUserRole(fakeCredentials),
        getUserData({ uid: fakeCredentials.uid }),
    ];

    const expectedActionsNetworkError = [
        changeUserRole(fakeCredentials),
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

    it('should change user role in success flow', async () => {
        mockChangeUserRole();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(changeUserRole(fakeCredentials));
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
        store.dispatch(changeUserRole(fakeCredentials));
        return promise;
    });
});
