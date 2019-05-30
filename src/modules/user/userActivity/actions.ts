import {
    USER_ACTIVITY_DATA,
    USER_ACTIVITY_FETCH,
} from '../../constants';

interface UserActivityFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    action?: string;
    topic?: string;
    email?: string;
    created_from?: number;
    created_to?: number;
}

export interface UserActivitySuccessPayload {
    list: UserActivityDataInterface[];
    page: number;
    total: number;
}

export interface UserActivityDataInterface {
    id: number;
    action: string;
    created_at: string;
    data: null;
    result: string;
    topic: string;
    user: {
        email: string;
        level: number;
        otp: boolean;
        state: string;
        uid: string;
    };
    user_agent: string;
    user_ip: string;
}

export interface UserActivityFetch {
    type: typeof USER_ACTIVITY_FETCH;
    payload: UserActivityFetchPayload;
}

export interface UserActivityData {
    type: typeof USER_ACTIVITY_DATA;
    payload: UserActivitySuccessPayload;
}

export type UserActivityAction =
    UserActivityFetch
    | UserActivityData;

export const getUserActivity = (payload: UserActivityFetchPayload): UserActivityFetch => ({
    type: USER_ACTIVITY_FETCH,
    payload,
});

export const userActivityData = (payload: UserActivityData['payload']): UserActivityData => ({
    type: USER_ACTIVITY_DATA,
    payload,
});
