import { combineReducers } from 'redux';
import { addNewLabelReducer, AddNewLabelState } from './addNewLabelReducer';
import { authReducer, AuthState } from './authReducer';
import { changeUserStateReducer, ChangeUserStateState } from './changeUserStateReducer';
import { changeUserRoleReducer, ChangeUserRoleState } from './changeUserRoleReducer';
import { deleteLabelReducer, DeleteLabelState } from './deleteLabelReducer';
import { userDataReducer, UserDataState } from './userDataReducer';
import { usersReducer, UsersState } from './usersReducer';

export * from './addNewLabelReducer';
export * from './authReducer';
export * from './changeUserStateReducer';
export * from './changeUserRoleReducer';
export * from './deleteLabelReducer';
export * from './userDataReducer';
export * from './usersReducer';

export interface AppState {
    addNewLabel: AddNewLabelState;
    auth: AuthState;
    deleteLabel: DeleteLabelState;
    selectedUser: UserDataState;
    users: UsersState;
    userState: ChangeUserStateState;
    userRole: ChangeUserRoleState;
}

export const appReducer = combineReducers({
    addNewLabel: addNewLabelReducer,
    auth: authReducer,
    deleteLabel: deleteLabelReducer,
    selectedUser: userDataReducer,
    users: usersReducer,
    userState: changeUserStateReducer,
    userRole: changeUserRoleReducer,
});