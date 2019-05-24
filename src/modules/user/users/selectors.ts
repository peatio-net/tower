import { AppState, UsersState } from '../../';

export const selectUsers = (state: AppState): UsersState['users'] =>
    state.usersData.users.users;

export const selectUsersLoading = (state: AppState): UsersState['loading'] =>
    state.usersData.users.loading;

export const selectCurrentUser = (state: AppState): UsersState['currentUser'] =>
    state.usersData.users.currentUser;

export const selectLoadingCurrentUser = (state: AppState): UsersState['loadingCurrentUser'] =>
    state.usersData.users.loadingCurrentUser;

export const selectUsersTotal = (state: AppState): UsersState['usersTotal'] =>
    state.usersData.users.usersTotal;
