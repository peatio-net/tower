import {combineReducers} from 'redux';
import {all, call} from 'redux-saga/effects';
import {
    alertReducer,
    AlertState,
    rootHandleAlertSaga,
} from './alert';
import {
    authReducer,
    AuthState,
    rootAuthSaga,
} from './auth';
import {
    changeUserReducer,
    ChangeUserState,
    rootChangeUserSaga,
} from './changeUser';
import {
    labelReducer,
    LabelState,
    rootLabelSaga,
} from './label';
import {metricsReducer, MetricsState} from './metrics';
import {rootMetricsSaga} from './metrics/sagas';
import {
    adminActivityReducer,
    AdminActivityState,
    currentUserReducer,
    CurrentUserState,
    rootAdminActivitySaga,
    rootCurrentUsersSaga,
    rootGetUserDataSaga,
    rootUserActivitySaga,
    rootUsersSaga,
    userActivityReducer,
    UserActivityState,
    userDataReducer,
    UserDataState,
    usersReducer,
    UsersState,
} from './user';
import {
    rootGetWithdrawInfoSaga,
    withdrawsInfoReducer,
    WithdrawsInfoState,
} from './withdrawInfo';
import {
    rootGetWithdrawListSaga,
    withdrawsListReducer,
    WithdrawsListState,
} from './withdrawList';
import {
    rootGetWithdrawUserHistorySaga,
    withdrawsUserHistoryReducer,
    WithdrawsUserHistoryState,
} from './withdrawUserHistory';

export * from './alert';
export * from './auth';
export * from './changeUser';
export * from './label';
export * from './user';
export * from './withdrawList';
export * from './withdrawInfo';
export * from './withdrawUserHistory';

export interface AppState {
    adminActivity: AdminActivityState;
    alert: AlertState;
    auth: AuthState;
    changeUserState: ChangeUserState;
    userActivity: UserActivityState;
    userLabels: LabelState;
    usersData: {
        selectedUser: UserDataState;
        users: UsersState;
        currentUser: CurrentUserState,
    };
    metrics: MetricsState;
    withdrawList: WithdrawsListState;
    withdrawInfo: WithdrawsInfoState;
    withdrawUserHistory: WithdrawsUserHistoryState;
}

const usersDataReducer = combineReducers({
    selectedUser: userDataReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
});

export const appReducer = combineReducers({
    adminActivity: adminActivityReducer,
    alert: alertReducer,
    auth: authReducer,
    changeUserState: changeUserReducer,
    userLabels: labelReducer,
    userActivity: userActivityReducer,
    usersData: usersDataReducer,
    metrics: metricsReducer,
    withdrawList: withdrawsListReducer,
    withdrawInfo: withdrawsInfoReducer,
    withdrawUserHistory: withdrawsUserHistoryReducer,
});

export function* rootSaga() {
    yield all([
        call(rootLabelSaga),
        call(rootAdminActivitySaga),
        call(rootAuthSaga),
        call(rootChangeUserSaga),
        call(rootGetUserDataSaga),
        call(rootUserActivitySaga),
        call(rootUsersSaga),
        call(rootHandleAlertSaga),
        call(rootMetricsSaga),
        call(rootGetWithdrawListSaga),
        call(rootGetWithdrawInfoSaga),
        call(rootGetWithdrawUserHistorySaga),
        call(rootCurrentUsersSaga),
    ]);
}
