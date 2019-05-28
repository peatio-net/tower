import * as actions from './actions';
import {
    initialUserActivityState,
    userActivityReducer,
} from './reducer';

describe('UserActivity reducer', () => {
    const userActivityData = [
        {
            id: 1,
            action: 'login',
            created_at: '2019-01-22T15:08:36.000Z',
            data: null,
            result: 'succeed',
            topic: 'session',
            user: {
                email: 'admin@barong.io',
                level: 3,
                otp: false,
                state: 'active',
                uid: 'ID873B710D88',
            },
            user_ip: '195.214.197.210',
            user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        },
        {
            id: 2,
            action: 'login',
            created_at: '2019-01-22T15:08:36.000Z',
            data: null,
            result: 'succeed',
            topic: 'session',
            user: {
                email: 'admin@barong.io',
                level: 3,
                otp: false,
                state: 'active',
                uid: 'ID873B710D88',
            },
            user_ip: '195.214.197.210',
            user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        },
    ];

    it('should handle USER_ACTIVITY_FETCH', () => {
        const expectedState = {
            ...initialUserActivityState,
            loading: true,
         };
        const payload = { page: 0, limit: 25 };
        expect(userActivityReducer(initialUserActivityState, actions.getUserActivity(payload))).toEqual(expectedState);
    });

    it('should handle USER_ACTIVITY_DATA', () => {
        const payload: actions.UserActivitySuccessPayload = {
            list: userActivityData,
            page: 1,
            total: 2,
        };

        const expectedState = {
            ...initialUserActivityState,
            ...payload,
            loading: false,
         };

        expect(userActivityReducer(initialUserActivityState, actions.userActivityData(payload))).toEqual(expectedState);
    });
});
