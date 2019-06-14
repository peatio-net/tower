import * as React from 'react';
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { minutesUntilAutoLogout } from '../../api/config';
import {
    Activities,
    AdminActivities,
    Dashboard,
    DocumentReview,
    Login,
    Orders,
    UserDirectory,
    UserInfo,
    WithdrawInfo,
    WithdrawList,
} from '../../containers';
import { UserInterface } from '../../modules';

const renderLoading = () => {
    return (
        <div>Loading...</div>
    );
};

const CHECK_INTERVAL = 15000;
const STORE_KEY = 'lastAction';

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

// tslint:disable-next-line
const SuperAdminRoute: React.SFC<any> = ({ component: CustomComponent, loading, isLogged, user, ...rest }) => {
    if (loading) {
        return renderLoading();
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged && user && user.role === 'superadmin') {
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
    logout: () => void;
    user?: UserInterface;
}

class Router extends React.Component<RouterProps> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;

    constructor(props: RouterProps) {
        super(props);
        this.initListener();
    }

    public componentDidMount() {
        this.initInterval();
        this.check();
    }

    public componentWillUnmount() {
        for (const type of Router.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
    }

    public render() {
        const { isCurrentSession, userLoading, user } = this.props;

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
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/pending"
                    component={DocumentReview}
                />
                <PrivateRoute
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/pending/:uid"
                    component={UserInfo}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/activities"
                    component={Activities}
                />
                <SuperAdminRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/admin-activities"
                    component={AdminActivities}
                    user={user}
                />
                <SuperAdminRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/admin-activities/:uid"
                    component={UserInfo}
                    user={user}
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
                    path="/tower/activities/:uid"
                    component={UserInfo}
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
                    exact={true}
                    path="/tower/orders"
                    component={Orders}
                />
                <PrivateRoute
                    loading={userLoading}
                    isLogged={isCurrentSession}
                    exact={true}
                    path="/tower/orderbooks"
                    component={Orders}
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

    private getLastAction = () => {
        if (localStorage.getItem(STORE_KEY) !== null) {
            return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
        }
        return 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };

    private initListener = () => {
        this.reset();
        for (const type of Router.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    };

    private reset = () => {
        this.setLastAction(Date.now());
    };

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    };

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout && user && user.email) {
            this.props.logout();
        }
    };
}

export const AppRouter = Router;
