import {
    FILTER_USERS_VERIFIED_DOCUMENTS,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_BY_LABELS_FETCH,
    GET_USERS_FETCH,
    GET_USERS_PENDING_DOCUMENTS_DATA,
    GET_USERS_PENDING_DOCUMENTS_FETCH,
    GET_USERS_SUCCESS,
} from '../../constants';

export interface UserProfile {
    uid: string;
    first_name: string;
    last_name: string;
    dob: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserLabel {
    uid: string;
    key: string;
    value: string;
    scope: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserDocument {
    upload: {
        url: string;
    };
    doc_type: string;
    doc_number: string;
    doc_expire: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserInterface {
    created_at?: string;
    email: string;
    id?: number;
    level: number;
    otp: boolean;
    role: string;
    state: string;
    uid: string;
    updated_at?: string;
    profile?: UserProfile;
    documents?: UserDocument[];
    labels?: UserLabel[];
}

export interface GetUsersFetch {
    type: typeof GET_USERS_FETCH;
    payload: {
        page?: number;
        limit?: number;
        extended?: boolean;
        email?: string;
        uid?: string;
        role?: string;
        name?: string;
        country?: string;
        level?: number;
        profile?: UserProfile;
        created_at?: number;
        updated_at?: number;
    };
}

export interface GetUsersSuccess {
    type: typeof GET_USERS_SUCCESS;
    payload: {
        users: UserInterface[],
        total: number,
    };
}

export interface GetDataByFilterFetch {
    type: typeof GET_DATA_BY_FILTER_FETCH;
    payload: {
        field: string;
        value: string;
        page?: number;
        limit?: number;
    };
}

export interface GetUsersByLabelFetch {
    type: typeof GET_USERS_BY_LABELS_FETCH;
    payload: {
        key: string;
        value: string;
        page?: number;
        limit?: number;
    };
}

export interface GetUsersWithPendingDocuments {
    type: typeof GET_USERS_PENDING_DOCUMENTS_FETCH;
    payload: {
        page?: number;
        limit?: number;
    };
}

export interface GetUsersWithPendingDocumentsData {
    type: typeof GET_USERS_PENDING_DOCUMENTS_DATA;
    payload: {
        users: UserInterface[],
        total: number,
    };
}

export interface FilterUsersWithVerifiedDocuments {
    type: typeof FILTER_USERS_VERIFIED_DOCUMENTS;
    payload: {
        uid: UserInterface['uid'],
    };
}

export type UsersAction = GetUsersFetch
    | GetUsersSuccess
    | GetDataByFilterFetch
    | GetUsersByLabelFetch
    | GetUsersWithPendingDocuments
    | GetUsersWithPendingDocumentsData
    | FilterUsersWithVerifiedDocuments;

export const getUsers = (payload: GetUsersFetch['payload']): GetUsersFetch => ({
    type: GET_USERS_FETCH,
    payload,
});

export const getUsersData = (payload: GetUsersSuccess['payload']): GetUsersSuccess => ({
    type: GET_USERS_SUCCESS,
    payload,
});

export const getDataByFilter = (payload: GetDataByFilterFetch['payload']): GetDataByFilterFetch => ({
    type: GET_DATA_BY_FILTER_FETCH,
    payload,
});

export const getUsersByLabel = (payload: GetUsersByLabelFetch['payload']): GetUsersByLabelFetch => ({
    type: GET_USERS_BY_LABELS_FETCH,
    payload,
});

export const getUsersWithPendingDocuments = (payload: GetUsersWithPendingDocuments['payload']): GetUsersWithPendingDocuments => ({
    type: GET_USERS_PENDING_DOCUMENTS_FETCH,
    payload,
});

export const getUsersWithPendingDocumentsData =
    (payload: GetUsersWithPendingDocumentsData['payload']): GetUsersWithPendingDocumentsData => ({
        type: GET_USERS_PENDING_DOCUMENTS_DATA,
        payload,
    });

export const filterUsersWithVerifiedDocuments =
    (payload: FilterUsersWithVerifiedDocuments['payload']): FilterUsersWithVerifiedDocuments => ({
        type: FILTER_USERS_VERIFIED_DOCUMENTS,
        payload,
    });
