import * as actions from './actions';
import {
    initialWithdrawsUserHistoryState,
    withdrawsUserHistoryReducer,
    WithdrawsUserHistoryState,
} from './reducer';

describe('WithdrawsInfo reducer', () => {
    it('should handle WITHDRAWS_USER_HISTORY_FETCH', () => {
        const expectedState: WithdrawsUserHistoryState = {
            ...initialWithdrawsUserHistoryState,
            loading: true,
        };
        expect(withdrawsUserHistoryReducer(initialWithdrawsUserHistoryState, actions.getWithdrawUserHistory({uid: 'uid1234'}))).toEqual(expectedState);
    });

    it('should handle WITHDRAWS_USER_HISTORY_DATA', () => {
        const payload = [
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

        const expectedState: WithdrawsUserHistoryState = {
            ...initialWithdrawsUserHistoryState,
            history: payload,
        };

        expect(withdrawsUserHistoryReducer(initialWithdrawsUserHistoryState, actions.getWithdrawUserHistoryData(payload))).toEqual(expectedState);
    });
});
