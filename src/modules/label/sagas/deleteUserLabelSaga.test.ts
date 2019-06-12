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
    deleteLabel,
} from '../actions';

describe('DeleteLabel saga', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, true)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeCredentials = {
        uid: '12',
        key: '12',
        scope: '12',
    };

    const mockDeleteLabel = () => {
        mockAxios.onDelete(`/admin/users/labels?uid=${fakeCredentials.uid}&key=${fakeCredentials.key}&scope=${fakeCredentials.scope}`).reply(200);
    };

    const expectedActionsFetch = [
        deleteLabel(fakeCredentials),
        getUserData({ uid: fakeCredentials.uid }),
    ];

    const expectedActionsNetworkError = [
        deleteLabel(fakeCredentials),
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

    it('should delete user label in success flow', async () => {
        mockDeleteLabel();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(deleteLabel(fakeCredentials));
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
        store.dispatch(deleteLabel(fakeCredentials));
        return promise;
    });
});
