import {
    AppBar,
    Button,
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    ChevronLeft,
    ChevronRight,
    Menu,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { icons } from './icons';

const drawerWidth = 256;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#3598D5',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '0 8px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    listItem: {
        borderRadius: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        letterSpacing: '0.1px',
        '&:hover': {
            backgroundColor: 'rgba(48,156,234,0.1)',
        },
        '&:focus': {
            backgroundColor: 'rgba(48, 156, 234, 0.1)',
        },
    },
    selected: {
        backgroundColor: 'rgba(48, 156, 234, 0.1) !important',
    },
    button: {
        color: '#309CEA',
    },
    link: {
        textDecoration: 'none',
    },
    navbarHidden: {
        display: 'none',
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    logout: () => void;
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    loggedIn: boolean;
    pathname: string;
    isSuperAdmin: boolean;
}

interface NavBarState {
    key: string;
}

class NavBar extends React.Component<Props, NavBarState> {
    public state = {
        key: '',
    };

    public NavBarItems = [
        { key: '/tower', value: 'Dashboard' },
        { key: '/tower/users', value: 'User directory' },
        { key: '/tower/pending', value: 'Pending Documents' },
        { key: '/tower/activities', value: 'User Activities' },
        // { key: '/tower/orders', value: 'Orders' },
        // { key: '/tower/orderbooks', value: 'Orderbooks' },
        // { key: '/tower/withdraws', value: 'Withdrawal requests' },
    ];

    public SuperAdminItems = [
        { key: '/tower/admin-activities', value: 'Admin Activities' },
    ];

    public componentDidMount() {
        const { pathname } = this.props;
        this.setState({
            key: pathname || '/tower',
        });
    }

    public componentWillReceiveProps(next: Props) {
        if (next.pathname !== this.props.pathname) {
            this.setState({
                key: next.pathname,
            });
        }
    }

    public render() {
        const { classes, loggedIn, isSuperAdmin } = this.props;

        return (
            <div>
                <AppBar
                  position="fixed"
                  className={classNames(classes.appBar, {[classes.navbarHidden]: !loggedIn})}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.props.open && classes.hide)}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} />
                        <Button color="inherit" onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.props.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.props.open ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.renderList(this.NavBarItems.slice(0, 1))}
                    </List>
                    <Divider />
                    <List>
                        {this.renderList(this.NavBarItems.slice(1, 5))}
                        {isSuperAdmin && this.renderList(this.SuperAdminItems)}
                    </List>
                    <Divider />
                    <List>
                        {this.renderList(this.NavBarItems.slice(5, 8))}
                    </List>
                </Drawer>
            </div>
        );
    }

    private handleDrawerOpen = () => {
        this.props.handleDrawerOpen();
    };

    private handleDrawerClose = () => {
        this.props.handleDrawerClose();
    };

    private handleLogout = () => {
        this.props.logout();
    };

    private handleClick = (key: string) => () => {
        this.setState({ key });
    };

    private renderList = list => {
        const { classes } = this.props;
        const { key } = this.state;

        return list.map(item => (
            <Link to={item.key} className={classes.link} key={item.key}>
                <ListItem
                    className={classes.listItem}
                    classes={{ selected: classes.selected, button: classes.button }}
                    button={true}
                    key={item.key}
                    onClick={this.handleClick(item.key)}
                    selected={key === item.key}
                >
                    <ListItemIcon>
                        {icons(item.key)}
                    </ListItemIcon>
                    <ListItemText
                        disableTypography={true}
                        primary={<Typography variant="body2">{item.value}</Typography>}
                    />
                </ListItem>
            </Link>
        ));
    }
}

export const Navbar = withStyles(styles, { withTheme: true })(NavBar);
