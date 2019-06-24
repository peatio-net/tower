import {
    LOGIN_FETCH,
    LOGOUT_FETCH,
    SIGN_IN_REQUIRE_2FA,
} from '../constants';

export interface LoginFetch {
    type: typeof LOGIN_FETCH;
    payload: {
        email: string,
        password: string,
        otp_code?: string,
    };
}

export interface SignInRequire2FA {
    type: typeof SIGN_IN_REQUIRE_2FA;
    payload: {
        require2fa: boolean;
    };
}

export interface LogoutFetch {
    type: typeof LOGOUT_FETCH;
}

export type AuthAction = LoginFetch
    | SignInRequire2FA
    | LogoutFetch;

export const login = (payload: LoginFetch['payload']): LoginFetch => ({
    type: LOGIN_FETCH,
    payload,
});

export const signInRequire2FA = (payload: SignInRequire2FA['payload']): SignInRequire2FA => ({
    type: SIGN_IN_REQUIRE_2FA,
    payload,
});

export const logout = (): LogoutFetch => ({
    type: LOGOUT_FETCH,
});
