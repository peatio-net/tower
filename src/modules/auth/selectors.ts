import {AppState, AuthState, UserDataInterface} from '../';

export const selectSignInRequire2FA = (state: AppState): AuthState['require2FA'] | undefined =>
    state.auth.require2FA;

export const selectUser = (state: AppState): UserDataInterface =>
    state.auth.user;
