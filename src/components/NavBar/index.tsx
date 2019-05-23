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
    AccessTime,
    ChevronLeft,
    ChevronRight,
    Home,
    Menu,
    People,
    TrendingUp,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
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
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    logout: () => void;
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

class NavBar extends React.Component<Props> {

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar
                    position="fixed"
                    className={classes.appBar}
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
                        <IconButton
                            color="inherit"
                            href="/tower"
                        >
                            <Home />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} onClick={this.goToDashboard}>
                            Control Tower
                        </Typography>
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
                        <ListItem className={classes.listItem} button={true} key="dashboard">
                            <ListItemIcon>
                                {icons('dashboard')}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Dashboard</Typography>}
                            />
                            </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem className={classes.listItem} button={true} key="user-directory">
                            <ListItemIcon><People /></ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">User directory</Typography>}
                            />
                        </ListItem>
                        <ListItem className={classes.listItem} button={true} key="pending=review">
                            <ListItemIcon><AccessTime /></ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Pending documents</Typography>}
                            />
                        </ListItem>
                        <ListItem className={classes.listItem} button={true} key="activities">
                            <ListItemIcon><TrendingUp /></ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">User activities</Typography>}
                            />
                        </ListItem>
                        <ListItem className={classes.listItem} button={true} key="admin">
                            <ListItemIcon>
                                {icons('admin')}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Admin activities</Typography>}
                            />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem className={classes.listItem} button={true} key="orders">
                            <ListItemIcon>
                                {icons('orders')}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Orders</Typography>}
                            />
                        </ListItem>
                        <ListItem className={classes.listItem} button={true} key="orderbooks">
                            <ListItemIcon>
                                {icons('orderbooks')}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Orderbooks</Typography>}
                            />
                        </ListItem>
                        <ListItem className={classes.listItem} button={true} key="withdrawal">
                            <ListItemIcon>
                                {icons('withdrawal')}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant="body2">Withdrawal requests</Typography>}
                            />
                        </ListItem>
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

    private goToDashboard = () => {
        window.location.replace('/tower');
    };
}

export const Navbar = withStyles(styles, { withTheme: true })(NavBar);
