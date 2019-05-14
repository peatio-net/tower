import * as Cookies from 'js-cookie';
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

// tslint:disable-next-line
const PrivateRoute: React.SFC<any> = ({ component: CustomComponent, isLogged, ...rest }) => {
    return (<Route {...rest} render={props => (isLogged ? <CustomComponent {...props} /> : <Redirect to="/login" />)} />);
};

class Router extends React.Component {
    public render() {
        const isCurrentSession = Cookies.get('session');

        return (
            <Switch>
                <PrivateRoute isLogged={isCurrentSession} exact={true} path="/activities" component={Activities} />
                <PrivateRoute isLogged={isCurrentSession} exact={true} path="/users" component={UserDirectory} />
                <PrivateRoute isLogged={isCurrentSession} exact={true} path="/" component={Dashboard}/>
                <PrivateRoute isLogged={isCurrentSession} path="/users/:uid" component={UserInfo}/>
                <PrivateRoute isLogged={isCurrentSession} exact={true} path="/withdraws" component={WithdrawList}/>
                <PrivateRoute isLogged={isCurrentSession} exact={true} path="/withdraws/:id" component={WithdrawInfo} />
                <Route exact={true} path="/login" component={Login}/>
                <Route path="**" render={() => <Redirect to="/"/>}/>
            </Switch>
        );
    }
}

export const AppRouter = Router;
