// import * as Cookies from 'js-cookie';
import * as React from 'react';
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import {
    Activities,
    Dashboard,
    Login,
    UserDirectory,
    UserInfo,
    WithdrawInfo,
    WithdrawList,
} from '../../containers';

const renderLoading = () => {
    return (
        <div>Loading...</div>
    );
};

// tslint:disable-next-line
const PrivateRoute: React.SFC<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/tower/login'} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    if (isLogged) {
        return <Route {...rest}><Redirect to={'/tower'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;
    return <Route {...rest} render={renderCustomerComponent} />;
};

interface RouterProps {
    isCurrentSession: boolean;
    userLoading: boolean;
}

class Router extends React.Component<RouterProps> {
    public render() {
        const { isCurrentSession, userLoading } = this.props;

        return (
            <Switch>
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/users"
                    component={UserDirectory}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/activities"
                    component={Activities}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower"
                    component={Dashboard}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path="/tower/users/:uid"
                    component={UserInfo}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/withdraws"
                    component={WithdrawList}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    path="/tower/withdraws/:id"
                    component={WithdrawInfo}
                />
                <PublicRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/login"
                    component={Login}
                />
                <Route path="**" render={() => <Redirect to="/tower/"/>}/>
            </Switch>
        );
    }
}

export const AppRouter = Router;
