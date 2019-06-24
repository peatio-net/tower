import { AppState, UsersState } from '../../';

export const selectUsers = (state: AppState): UsersState['users'] =>
    state.usersData.users.users;

export const selectPendingUsers = (state: AppState): UsersState['users'] =>
    state.usersData.users.pending;

export const selectUsersLoading = (state: AppState): UsersState['loading'] =>
    state.usersData.users.loading;

export const selectUsersTotal = (state: AppState): UsersState['usersTotal'] =>
    state.usersData.users.usersTotal;

export const selectPendingTotal = (state: AppState): UsersState['pendingTotal'] =>
    state.usersData.users.pendingTotal;
