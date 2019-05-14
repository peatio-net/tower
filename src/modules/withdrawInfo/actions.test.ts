import * as actions from './actions';

describe('WithdrawInfo actions', () => {
    it('should check getWithdrawsInfo action creator', () => {
        const expectedAction = {
            type: 'withdrawInfo/WITHDRAWS_INFO_FETCH',
            payload: 'wid123123',
        };
        expect(actions.getWithdrawsInfo(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getWithdrawsInfoData action creator', () => {
        const expectedAction = {
            type: 'withdrawInfo/WITHDRAWS_INFO_DATA',
            payload: {
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
            },
        };
        expect(actions.getWithdrawsInfoData(expectedAction.payload)).toEqual(expectedAction);
    });
});
