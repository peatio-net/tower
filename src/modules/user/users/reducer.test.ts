import * as actions from './actions';
import {initialUsersState, usersReducer} from './reducer';

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
        expect(usersReducer(initialUsersState, actions.getUsersData({
            users: expectedState.users,
            total: 60,
        }))).toEqual(expectedState);
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

    it('should handle GET_USERS_PENDING_DOCUMENTS_FETCH', () => {
        const expectedState = {
            ...initialUsersState,
            loading: true,
        };
        expect(usersReducer(initialUsersState, actions.getUsersWithPendingDocuments({}))).toEqual(expectedState);
    });

    it('should handle GET_USERS_PENDING_DOCUMENTS_DATA', () => {
        const payload = {
            pending: [{
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
            total: 60,
        };
        const expectedState = {
            ...initialUsersState,
            loading: false,
            pending: payload.pending,
            pendingTotal: 60,
        };
        expect(usersReducer(initialUsersState, actions.getUsersWithPendingDocumentsData({users: payload.pending, total: payload.total}))).toEqual(expectedState);
    });

    it('should handle FILTER_USERS_VERIFIED_DOCUMENTS', () => {
        const payload = {
            uid: '3',
        };
        const initialState = {
            ...initialUsersState,
            // tslint:disable-next-line:no-any
            pending: [{uid: '1'}, {uid: '2'}, {uid: '3'}] as any as actions.UserInterface[],
        };
        const expectedState = {
            ...initialUsersState,
            pending: [{uid: '1'}, {uid: '2'}],
        };
        expect(usersReducer(initialState, actions.filterUsersWithVerifiedDocuments(payload))).toEqual(expectedState);
    });
});
