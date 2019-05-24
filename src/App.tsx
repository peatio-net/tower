import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { Router } from 'react-router-dom';
import { Alerts, Layout } from './containers';
import { GuardWrapper } from './containers/Guard';
import {
    AppState,
    getCurrentUser,
    logout,
    selectCurrentUser,
    selectLoadingCurrentUser,
    UserInterface,
} from './modules';
import { AppRouter } from './router';

interface ReduxProps {
    user?: UserInterface;
    isUserLoading: boolean;
}

interface DispatchProps {
    logout: typeof logout;
    getCurrentUser: typeof getCurrentUser;
}

interface OwnProps {
    history: History;
}

type Props = DispatchProps & OwnProps & ReduxProps;

class AppLayout extends React.Component<Props> {
    public componentDidMount() {
        this.props.getCurrentUser();
    }

    public render() {
        const { history, user, isUserLoading } = this.props;
        const isCurrentSession = user ? true : false;

        return (
            <GuardWrapper>
                <Router history={history}>
                    <Layout logout={this.userLogout} loggedIn={isCurrentSession}>
                        <Alerts />
                        <AppRouter userLoading={isUserLoading} isCurrentSession={isCurrentSession} />
                    </Layout>
                </Router>
            </GuardWrapper>
        );
    }

    private userLogout = () => {
        this.props.logout();
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    user: selectCurrentUser(state),
    isUserLoading: selectLoadingCurrentUser(state),
});


const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logout()),
    getCurrentUser: () => dispatch(getCurrentUser()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout);
