import * as Cookies from 'js-cookie';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
    Layout,
} from './components';
import { Alerts } from './containers';
import {GuardWrapper} from './containers/Guard';
import {
    logout,
} from './modules';
import { AppRouter } from './router';

interface DispatchProps {
    logout: typeof logout;
}

type Props = DispatchProps;

class AppLayout extends React.Component<Props> {
    public render() {
        const isCurrentSession = Cookies.get('session');
        return (
            <GuardWrapper>
                <BrowserRouter basename="/tower">
                    <React.Fragment>
                        <Layout logout={this.userLogout} loggedIn={isCurrentSession ? true : false}>
                            <Alerts />
                            <AppRouter />
                        </Layout>
                    </React.Fragment>
                </BrowserRouter>
            </GuardWrapper>
        );
    }

    private userLogout = () => {
        this.props.logout();
    };
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logout()),
});

export const App = connect(null, mapDispatchToProps)(AppLayout);
