import {
    createStyles,
    CssBaseline,
    WithStyles,
} from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Footer, Navbar } from '../../components';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth + 24 - 8,
    },
});

interface OwnProps extends WithStyles<typeof styles> {
    theme: Theme;
    children: React.ReactNode;
    logout: () => void;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    loggedIn: boolean;
    open: boolean;
    location?: {
        pathname: string;
    };
    isSuperAdmin: boolean;
}

type Props = OwnProps;

class LayoutComponent extends React.Component<Props, object> {
    public render() {
        const {
            classes,
            children,
            loggedIn,
            handleDrawerOpen,
            handleDrawerClose,
            isSuperAdmin,
        } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Navbar
                    loggedIn={loggedIn}
                    logout={this.handleLogout}
                    open={this.props.open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                    pathname={location && location.pathname}
                    isSuperAdmin={isSuperAdmin}
                />
                <main className={classNames(classes.content, {[classes.contentShift]: this.props.open})}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
                <Footer/>
            </div>
        );
    }

    private handleLogout = () => {
        this.props.logout();
    };
}

export const Layout = withStyles(styles, { withTheme: true })(LayoutComponent);
