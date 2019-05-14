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
    getWithdrawsInfo,
    getWithdrawsInfoData,
} from '../actions';

describe('WithdrawsInfo saga', () => {
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

    const fakeWithdrawInfoResponse = {
        account_number: 0,
        address: '',
        amount: 0,
        bank_address: '',
        bank_country: '',
        bank_name: '',
        bank_swift_code: 0,
        country: '',
        currency: '',
        date: '',
        email: '',
        intermediary_bank_address: '',
        intermediary_bank_country: '',
        intermediary_bank_name: '',
        intermediary_bank_swift_code: 0,
        name: '',
        rid: 0,
        state: '',
        uid: '',
    };

    const payload = '1234';

    const mockGetInfoData = () => {
        mockAxios.onGet(`/admin/withdraws/pending/${payload}`).reply(200, fakeWithdrawInfoResponse);
    };

    const expectedActionsFetch = [
        getWithdrawsInfo(payload),
        getWithdrawsInfoData(fakeWithdrawInfoResponse),
    ];

    const expectedActionsNetworkError = [
        getWithdrawsInfo(payload),
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
        mockGetInfoData();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(getWithdrawsInfo(payload));
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
        store.dispatch(getWithdrawsInfo(payload));
        return promise;
    });
});
