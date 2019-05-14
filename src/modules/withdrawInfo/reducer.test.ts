import * as actions from './actions';
import {
    initialWithdrawsInfoState,
    withdrawsInfoReducer,
    WithdrawsInfoState,
} from './reducer';

describe('WithdrawsInfo reducer', () => {
    it('should handle WITHDRAWS_INFO_FETCH', () => {
        const expectedState: WithdrawsInfoState = {
            ...initialWithdrawsInfoState,
            loading: true,
        };
        expect(withdrawsInfoReducer(initialWithdrawsInfoState, actions.getWithdrawsInfo('1234'))).toEqual(expectedState);
    });

    it('should handle WITHDRAWS_INFO_DATA', () => {
        const payload = {
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

        const expectedState: WithdrawsInfoState = {
            ...initialWithdrawsInfoState,
            info: payload,
        };

        expect(withdrawsInfoReducer(initialWithdrawsInfoState, actions.getWithdrawsInfoData(payload))).toEqual(expectedState);
    });
});
