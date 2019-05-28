import { AppState, UserActivityState } from '../../';

export const selectUserActivity = (state: AppState) =>
    state.userActivity.list;

export const selectTotalNumber = (state: AppState): UserActivityState['total'] =>
    state.userActivity.total;

export const selectUserActivityCurrentPage = (state: AppState): UserActivityState['page'] =>
    state.userActivity.page;

export const selectUserActivityLoading = (state: AppState): UserActivityState['loading'] =>
    state.userActivity.loading;
