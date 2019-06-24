import * as actions from './actions';

describe('Auth actions', () => {
    it('should check logout action creator', () => {
        const expectedAction = { type: 'LOGOUT_FETCH' };
        expect(actions.logout()).toEqual(expectedAction);
    });

    it('should check login action creator', () => {
        const payload = {
            email: 'john.barong@gmail.com',
            password: '123123',
        };
        const expectedAction = { type: 'LOGIN_FETCH', payload };
        expect(actions.login(payload)).toEqual(expectedAction);
    });

    it('should check signInRequire2FA action creator', () => {
        const payload = { require2fa: true };
        const expectedAction = { type: 'SIGN_IN_REQUIRE_2FA', payload };
        expect(actions.signInRequire2FA(payload)).toEqual(expectedAction);
    });
});
