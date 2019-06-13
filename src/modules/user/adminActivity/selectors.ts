import {AppState} from '../../index';
import {AdminActivityState} from './reducer';

export const selectAdminActivity = (state: AppState) =>
    state.adminActivity.list;

export const selectAdminActivityTotalNumber = (state: AppState): AdminActivityState['total'] =>
    state.adminActivity.total;

export const selectAdminActivityCurrentPage = (state: AppState): AdminActivityState['page'] =>
    state.adminActivity.page;

export const selectAdminActivityLoading = (state: AppState): AdminActivityState['loading'] =>
    state.adminActivity.loading;
