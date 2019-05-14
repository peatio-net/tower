import * as actions from './actions';

describe('WithdrawUserHistory actions', () => {
    it('should check getWithdrawUserHistory action creator', () => {
        const expectedAction = {
            type: 'withdrawUserHistory/WITHDRAWS_USER_HISTORY_FETCH',
            payload: {
                uid: 'uid1212',
            },
        };
        expect(actions.getWithdrawUserHistory(expectedAction.payload)).toEqual(expectedAction);
    });

    it('should check getWithdrawUserHistoryData action creator', () => {
        const expectedAction = {
            type: 'withdrawUserHistory/WITHDRAWS_USER_HISTORY_DATA',
            payload: [],
        };
        expect(actions.getWithdrawUserHistoryData(expectedAction.payload)).toEqual(expectedAction);
    });
});
