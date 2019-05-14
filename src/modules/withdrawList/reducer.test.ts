import * as actions from './actions';
import {
    initialWithdrawsListState,
    withdrawsListReducer,
    WithdrawsListState,
} from './reducer';

describe('WithdrawsList reducer', () => {
    it('should handle WITHDRAWS_LIST_FETCH', () => {
        const expectedState: WithdrawsListState = {
            ...initialWithdrawsListState,
            loading: true,
        };
        expect(withdrawsListReducer(initialWithdrawsListState, actions.getWithdrawsList())).toEqual(expectedState);
    });

    it('should handle WITHDRAWS_LIST_DATA', () => {
        const payload = [
            {
                uid: '',
                email: '',
                date: '',
                amount: '',
                currency: '',
                status: '',
            },
        ];
        const expectedState: WithdrawsListState = {
            ...initialWithdrawsListState,
            list: payload,
        };

        expect(withdrawsListReducer(initialWithdrawsListState, actions.getWithdrawsListData(payload))).toEqual(expectedState);
    });
});
