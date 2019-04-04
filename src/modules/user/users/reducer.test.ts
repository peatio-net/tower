import * as actions from './actions';
import { initialUsersState, usersReducer } from './reducer';

describe('Users reducer', () => {
    it('should handle GET_USERS_FETCH', () => {
        const expectedState = {
            ...initialUsersState,
            loading: true,
        };
        expect(usersReducer(initialUsersState, actions.getUsers({}))).toEqual(expectedState);
    });

    it('should handle GET_USERS_SUCCESS', () => {
        const expectedState = {
            ...initialUsersState,
            loading: false,
            users: [{
                created_at: '',
                email: '',
                id: 0,
                level: 0,
                otp: false,
                role: '',
                state: '',
                uid: '',
                updated_at: '',
            }],
            usersTotal: 60,
        };
        expect(usersReducer(initialUsersState, actions.getUsersData({users: expectedState.users, total: 60}))).toEqual(expectedState);
    });

    it('should handle GET_DATA_BY_FILTER_FETCH', () => {
        const expectedState = {
            ...initialUsersState,
            loading: true,
        };
        const payload = {
            field: '',
            value: '',
        };
        expect(usersReducer(initialUsersState, actions.getDataByFilter(payload))).toEqual(expectedState);
    });

    it('should handle GET_CURRENT_USER_FETCH', () => {
        const expectedState = {
            ...initialUsersState,
            loadingCurrentUser: true,
        };
        expect(usersReducer(initialUsersState, actions.getCurrentUser())).toEqual(expectedState);
    });

    it('should handle GET_CURRENT_USER_DATA', () => {
        const fakeUser = {
            created_at: '',
            email: '',
            id: 0,
            level: 0,
            otp: false,
            role: '',
            state: '',
            uid: '',
            updated_at: '',
        };
        const expectedState = {
            ...initialUsersState,
            loadingCurrentUser: false,
            currentUser: fakeUser,
        };
        expect(usersReducer(initialUsersState, actions.getCurrentUserData(fakeUser))).toEqual(expectedState);
    });

    it('should handle GET_USERS_BY_LABELS_FETCH', () => {
        const expectedState = {
            ...initialUsersState,
            loading: true,
        };
        const payload = {
            key: '',
            value: '',
        };
        expect(usersReducer(initialUsersState, actions.getUsersByLabel(payload))).toEqual(expectedState);
    });
});
