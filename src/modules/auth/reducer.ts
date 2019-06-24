import { SIGN_IN_REQUIRE_2FA } from '../constants';
import { AuthAction } from './';

export interface AuthState {
    require2FA?: boolean;
}

export const initialStateAuth = {
    require2FA: false,
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
    switch (action.type) {
        case SIGN_IN_REQUIRE_2FA:
            return {
                ...state,
                require2FA: action.payload.require2fa,
            };
        default:
            return { ...state };
    }
};
