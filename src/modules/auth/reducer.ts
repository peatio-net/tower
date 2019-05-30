import {
    LOGIN_DATA,
    LOGIN_FETCH,
    LOGOUT_DATA,
    LOGOUT_FETCH,
    SIGN_IN_REQUIRE_2FA,
} from '../constants';
import {AuthAction} from './';

export interface UserDataInterface {
    email: string;
    level: number;
    otp: boolean;
    role: string;
    state: string;
    uid: string;
}

export interface AuthState {
    user: UserDataInterface;
    require2FA?: boolean;
}

const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
        return {};
    }
};

export const initialStateAuth = {
    user: getUser(),
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
    switch (action.type) {
        case LOGIN_FETCH:
            return {
                ...state,
            };
        case LOGIN_DATA:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT_FETCH:
            localStorage.removeItem('user');
            return {
                ...state,
            };
        case LOGOUT_DATA:
            return {
                ...state,
                user: {},
            };
        case SIGN_IN_REQUIRE_2FA:
            return {
                ...state,
                require2FA: action.payload.require2fa,
            };
        default:
            return {
                ...state,
            };
    }
};
