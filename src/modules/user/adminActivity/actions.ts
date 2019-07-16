import {
    ADMIN_ACTIVITY_DATA,
    ADMIN_ACTIVITY_FETCH,
} from '../../constants';

interface AdminActivityFetchPayload {
    page: number;
    limit: number;
}

export interface AdminActivitySuccessPayload {
    list: AdminActivityDataInterface[];
    page: number;
    total: number;
}

interface UserInterface {
    email: string;
    uid: string;
    role: string;
    level: number;
    otp: boolean;
    state: string;
}

export interface DataInterface {
    type: string;
    value: string;
}

export interface AdminActivityDataInterface {
    action: string;
    created_at: string;
    data: DataInterface[];
    result: string;
    topic: string;
    admin: UserInterface;
    target: UserInterface;
    user_agent: string;
    user_ip: string;
}

export interface AdminActivityFetch {
    type: typeof ADMIN_ACTIVITY_FETCH;
    payload: AdminActivityFetchPayload;
}

export interface AdminActivityData {
    type: typeof ADMIN_ACTIVITY_DATA;
    payload: AdminActivitySuccessPayload;
}

export type AdminActivityAction =
    AdminActivityFetch
    | AdminActivityData;

export const getAdminActivity = (payload: AdminActivityFetchPayload): AdminActivityFetch => ({
    type: ADMIN_ACTIVITY_FETCH,
    payload,
});

export const adminActivityData = (payload: AdminActivityData['payload']): AdminActivityData => ({
    type: ADMIN_ACTIVITY_DATA,
    payload,
});
