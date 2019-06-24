import {
    FILTER_USERS_VERIFIED_DOCUMENTS,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_BY_LABELS_FETCH,
    GET_USERS_FETCH,
    GET_USERS_PENDING_DOCUMENTS_DATA,
    GET_USERS_PENDING_DOCUMENTS_FETCH,
    GET_USERS_SUCCESS,
} from '../../constants';
import { UserInterface, UsersAction } from './actions';

export interface UsersState {
    loading: boolean;
    users: UserInterface[];
    pending: UserInterface[];
    usersTotal: number;
    pendingTotal: number;
}

export const initialUsersState: UsersState = {
    loading: false,
    users: [],
    pending: [],
    usersTotal: 0,
    pendingTotal: 0,
};

export const usersReducer = (state = initialUsersState, action: UsersAction) => {
    switch (action.type) {
        case GET_USERS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                usersTotal: action.payload.total,
            };
        case GET_DATA_BY_FILTER_FETCH:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_BY_LABELS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_PENDING_DOCUMENTS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_PENDING_DOCUMENTS_DATA:
            return {
                ...state,
                pending: action.payload.users,
                pendingTotal: action.payload.total,
            };
        case FILTER_USERS_VERIFIED_DOCUMENTS:
            return {
                ...state,
                pending: state.pending.filter(u => u.uid !== action.payload.uid),
            };
        default:
            return {
                ...state,
            };
    }
};
