import * as actions from './actions';

describe('Users actions', () => {
    it('should check getUsers action creator', () => {
        const expectedAction = { type: 'GET_USERS_FETCH', payload: {}};
        expect(actions.getUsers({})).toEqual(expectedAction);
    });

    it('should check getUsersData action creator', () => {
        const payload = {
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
          total: 1,
        };
        const expectedAction = { type: 'GET_USERS_SUCCESS', payload };
        expect(actions.getUsersData(payload)).toEqual(expectedAction);
    });

    it('should check getDataByFilter action creator', () => {
        const payload = {
            field: '',
            value: '',
        };
        const expectedAction = { type: 'GET_DATA_BY_FILTER_FETCH', payload };
        expect(actions.getDataByFilter(payload)).toEqual(expectedAction);
    });

    it('should check getUsersByLabel action creator', () => {
        const payload = {
            key: '',
            value: '',
        };
        const expectedAction = { type: 'GET_USERS_BY_LABELS_FETCH', payload };
        expect(actions.getUsersByLabel(payload)).toEqual(expectedAction);
    });

    it('should check getUsersWithPendingDocumentsData action creator', () => {
        const payload = {
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
            total: 10,
        };
        const expectedAction = { type: 'GET_USERS_PENDING_DOCUMENTS_DATA', payload };
        expect(actions.getUsersWithPendingDocumentsData(payload)).toEqual(expectedAction);
    });

    it('should check filterUsersWithVerifiedDocuments action creator', () => {
        const payload = {
            uid: '1',
        };
        const expectedAction = { type: 'FILTER_USERS_VERIFIED_DOCUMENTS', payload };
        expect(actions.filterUsersWithVerifiedDocuments(payload)).toEqual(expectedAction);
    });
});
