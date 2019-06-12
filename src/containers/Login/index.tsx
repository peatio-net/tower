import {
    createStyles,
    CssBaseline,
    Paper,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { LoginBox } from '../../components';
import {
    AppState,
    login,
    selectSignInRequire2FA,
} from '../../modules';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(theme.spacing.unit * 6 + 400)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface ReduxProps {
    require2fa?: boolean;
}

interface LoginState {
    email: string;
    password: string;
    otp_code: string;
}

interface DispatchProps {
    login: typeof login;
}

type Props = StyleProps & ReduxProps & DispatchProps;

class LoginScreen extends React.Component<Props, LoginState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            otp_code: '',
        };
    }

    public render() {
        const { classes } = this.props;
        const { email, password } = this.state;
        const require2FA = this.props.require2fa;

        return (
            <div className={classes.root}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <LoginBox
                            email={email}
                            password={password}
                            handleChangeEmail={this.handleChangeEmailValue}
                            handleChangePassword={this.handleChangePasswordValue}
                            handleOTPCode={this.handleChangeOTPCodeValue}
                            handleSignIn={this.signIn}
                            require2FA={require2FA}
                        />
                    </Paper>
                </main>
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChangeEmailValue = (e: any) => {
        this.setState({
          email: e.target.value,
        });
    };

    // tslint:disable-next-line:no-any
    private handleChangePasswordValue = (e: any) => {
        this.setState({
          password: e.target.value,
        });
    };

    // tslint:disable-next-line:no-any
    private handleChangeOTPCodeValue = (e: any) => {
        this.setState({
            otp_code: e.target.value,
        });
    };

    private signIn = () => {
        const { email, password, otp_code } = this.state;
        this.props.login({email, password, otp_code});
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        require2fa: selectSignInRequire2FA(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        login: payload => dispatch(login(payload)),
    });

// tslint:disable-next-line:no-any
export const Login = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(LoginScreen as any));
