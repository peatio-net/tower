import * as actions from './actions';
import { authReducer, initialStateAuth } from './reducer';

describe('Auth reducer', () => {
    it('should handle LOGOUT_FETCH', () => {
        const expectedState = { ...initialStateAuth };
        const spy = jest.spyOn(localStorage, 'removeItem');
        expect(authReducer(initialStateAuth, actions.logout())).toEqual(expectedState);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should handle LOGOUT_DATA', () => {
        const expectedState = { ...initialStateAuth, user: {} };
        expect(authReducer(initialStateAuth, actions.logoutData())).toEqual(expectedState);
    });

    it('should handle LOGIN_FETCH', () => {
        const expectedState = { ...initialStateAuth };
        expect(authReducer(initialStateAuth, actions.login({email: 'john.barong@gmail.com', password: '123123'}))).toEqual(expectedState);
    });

    it('should handle LOGIN_DATA', () => {
        const fakeUser = {
            email: 'admin@barong.io',
            uid: 'ID26C901376F',
            role: 'admin',
            level: 3,
            otp: false,
            state: 'active',
        };
        const expectedState = { ...initialStateAuth, user: fakeUser };
        const spy = jest.spyOn(localStorage, 'setItem');

        expect(authReducer(initialStateAuth, actions.loginData(fakeUser))).toEqual(expectedState);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(fakeUser));
    });

    it('should handle SIGN_IN_REQUIRE_2FA', () => {
        const expectedState = {
            ...initialStateAuth,
            require2FA: true,
        };
        expect(authReducer(initialStateAuth, actions.signInRequire2FA({ require2fa: true }))).toEqual(expectedState);
    });
});
