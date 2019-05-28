import {
    USER_ACTIVITY_DATA,
    USER_ACTIVITY_FETCH,
} from '../../constants';
import * as actions from './actions';

describe('User Activity actions', () => {
    it('should check getUserActivity action creator', () => {
        const payload = { page: 0, limit: 25 };
        const expectedAction = { type: USER_ACTIVITY_FETCH, payload };
        expect(actions.getUserActivity(payload)).toEqual(expectedAction);
    });

    it('should check userActivityData action creator', () => {
        const payload = { list: [], page: 2, total: 0 };
        const expectedAction = { type: USER_ACTIVITY_DATA, payload };
        expect(actions.userActivityData(payload)).toEqual(expectedAction);
    });
});
