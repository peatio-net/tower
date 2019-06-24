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
    selectCurrentUserLoggedIn,
    selectLoadingCurrentUser,
    UserInterface,
} from './modules';
import { AppRouter } from './router';

interface ReduxProps {
    user?: UserInterface;
    isUserLoading: boolean;
    loggedIn: boolean;
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
    public state = {
        open: false,
    };

    public componentDidMount() {
        this.props.getCurrentUser();

        if (this.props.loggedIn) {
            this.setState({
                open: true,
            });
        }
    }

    public componentDidUpdate(prev: Props) {
        if (prev.loggedIn !== this.props.loggedIn && this.props.loggedIn) {
            this.setState({ open: true });
        }
    }

    public render() {
        const { history, user, isUserLoading, loggedIn } = this.props;

        return (
            <GuardWrapper>
                <Router history={history}>
                    <Layout
                        logout={this.userLogout}
                        loggedIn={loggedIn}
                        handleDrawerOpen={this.handleDrawerOpen}
                        handleDrawerClose={this.handleDrawerClose}
                        open={this.state.open}
                        isSuperAdmin={user && user.role === 'superadmin' || false}
                    >
                        <Alerts />
                        <AppRouter
                            userLoading={isUserLoading}
                            isCurrentSession={loggedIn}
                            logout={this.userLogout}
                            user={user}
                        />
                    </Layout>
                </Router>
            </GuardWrapper>
        );
    }

    private userLogout = () => {
        this.props.logout();
        this.handleDrawerClose();
    };

    private handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    private handleDrawerClose = () => {
        this.setState({ open: false });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    user: selectCurrentUser(state),
    isUserLoading: selectLoadingCurrentUser(state),
    loggedIn: selectCurrentUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logout()),
    getCurrentUser: () => dispatch(getCurrentUser()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout);
