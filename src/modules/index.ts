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

export * from './alert';
export * from './auth';
export * from './changeUser';
export * from './label';
export * from './user';

export interface AppState {
    alert: AlertState;
    auth: AuthState;
    changeUserState: ChangeUserState;
    userActivity: UserActivityState;
    userLabels: LabelState;
    usersData: {
        selectedUser: UserDataState;
        users: UsersState;
    };
    metrics: MetricsState;
}

const usersDataReducer = combineReducers({
    selectedUser: userDataReducer,
    users: usersReducer,
});

export const appReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    changeUserState: changeUserReducer,
    userLabels: labelReducer,
    userActivity: userActivityReducer,
    usersData: usersDataReducer,
    metrics: metricsReducer,
});

export function* rootSaga() {
    yield all([
        call(rootLabelSaga),
        call(rootAuthSaga),
        call(rootChangeUserSaga),
        call(rootGetUserDataSaga),
        call(rootUserActivitySaga),
        call(rootUsersSaga),
        call(rootHandleAlertSaga),
        call(rootMetricsSaga),
    ]);
}
