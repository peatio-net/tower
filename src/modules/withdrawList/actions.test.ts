import * as actions from './actions';

describe('WithdrawList actions', () => {
    it('should check getWithdrawsList action creator', () => {
        const expectedAction = {
            type: 'withdrawList/WITHDRAWS_LIST_FETCH',
        };
        expect(actions.getWithdrawsList()).toEqual(expectedAction);
    });

    it('should check getWithdrawsListData action creator', () => {
        const expectedAction = {
            type: 'withdrawList/WITHDRAWS_LIST_DATA',
            payload: [
                {
                    uid: '',
                    email: '',
                    date: '',
                    amount: '',
                    currency: '',
                    status: '',
                },
            ],
        };
        expect(actions.getWithdrawsListData(expectedAction.payload)).toEqual(expectedAction);
    });
});
