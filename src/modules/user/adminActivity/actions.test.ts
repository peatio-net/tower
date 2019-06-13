import {
    ADMIN_ACTIVITY_DATA,
    ADMIN_ACTIVITY_FETCH,
} from '../../constants';
import * as actions from './actions';

describe('Admin Activity actions', () => {
    it('should check getAdminActivity action creator', () => {
        const payload = { page: 1, limit: 25 };
        const expectedAction = { type: ADMIN_ACTIVITY_FETCH, payload };
        expect(actions.getAdminActivity(payload)).toEqual(expectedAction);
    });

    it('should check adminActivityData action creator', () => {
        const payload = { list: [], page: 2, total: 0 };
        const expectedAction = { type: ADMIN_ACTIVITY_DATA, payload };
        expect(actions.adminActivityData(payload)).toEqual(expectedAction);
    });
});
