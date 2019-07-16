import * as actions from './actions';
import {
    adminActivityReducer,
    initialAdminActivityState,
} from './reducer';

describe('AdminActivity reducer', () => {
    const adminActivityData = [
        {
            action: 'login',
            created_at: '2019-01-22T15:08:36.000Z',
            result: 'succeed',
            topic: 'session',
            admin: {
                email: 'admin@barong.io',
                level: 3,
                otp: false,
                state: 'active',
                uid: 'ID873B710D88',
                role: 'admin',
            },
            target: {
                email: 'admin@barong.io',
                level: 3,
                otp: false,
                state: 'active',
                uid: 'ID873B710D88',
                role: 'admin',
            },
            user_ip: '195.214.197.210',
            user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            data: [{ type: 'key', value: 'path'}, {type: 'value', value: 'api/v2/barong/resource/users/me' }],
        },
    ];

    it('should handle ADMIN_ACTIVITY_FETCH', () => {
        const expectedState = {
            ...initialAdminActivityState,
            loading: true,
         };
        const payload = { page: 1, limit: 25 };
        expect(adminActivityReducer(initialAdminActivityState, actions.getAdminActivity(payload))).toEqual(expectedState);
    });

    it('should handle ADMIN_ACTIVITY_DATA', () => {
        const payload: actions.AdminActivitySuccessPayload = {
            list: adminActivityData,
            page: 1,
            total: 2,
        };

        const expectedState = {
            ...initialAdminActivityState,
            ...payload,
            loading: false,
         };

        expect(adminActivityReducer(initialAdminActivityState, actions.adminActivityData(payload))).toEqual(expectedState);
    });
});
