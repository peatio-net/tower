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
    editLabel,
} from '../actions';

describe('EditLabel saga', () => {
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

    const mockEditLabel = () => {
        mockAxios.onPost('/admin/users/labels/update').reply(200);
    };

    const fakeCredentials = {
        uid: '',
        key: '',
        value: '',
        scope: '',
    };

    const expectedActionsFetch = [
        editLabel(fakeCredentials),
        getUserData({ uid: fakeCredentials.uid }),
    ];

    const expectedActionsNetworkError = [
        editLabel(fakeCredentials),
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

    it('should edit user label in success flow', async () => {
        mockEditLabel();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(editLabel(fakeCredentials));
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
        store.dispatch(editLabel(fakeCredentials));
        return promise;
    });
});
