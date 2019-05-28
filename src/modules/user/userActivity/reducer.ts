import {
    USER_ACTIVITY_DATA,
    USER_ACTIVITY_FETCH,
} from '../../constants';
import { UserActivityAction, UserActivityDataInterface } from './actions';

export interface UserActivityState {
    list: UserActivityDataInterface[];
    loading: boolean;
    page: number;
    total: number;
}

export const initialUserActivityState: UserActivityState = {
    list: [],
    loading: false,
    page: 0,
    total: 0,
};

export const userActivityReducer = (state = initialUserActivityState, action: UserActivityAction) => {
    switch (action.type) {
        case USER_ACTIVITY_FETCH:
            return {
                ...state,
                loading: true,
            };
        case USER_ACTIVITY_DATA:
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
