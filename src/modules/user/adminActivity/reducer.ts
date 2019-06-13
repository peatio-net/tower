import {
    ADMIN_ACTIVITY_DATA,
    ADMIN_ACTIVITY_FETCH,
} from '../../constants';
import { AdminActivityAction, AdminActivityDataInterface } from './actions';

export interface AdminActivityState {
    list: AdminActivityDataInterface[];
    loading: boolean;
    page: number;
    total: number;
}

export const initialAdminActivityState: AdminActivityState = {
    list: [],
    loading: false,
    page: 0,
    total: 0,
};

export const adminActivityReducer = (state = initialAdminActivityState, action: AdminActivityAction) => {
    switch (action.type) {
        case ADMIN_ACTIVITY_FETCH:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_ACTIVITY_DATA:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return state;
    }
};
