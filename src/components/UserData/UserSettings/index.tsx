import {
    createStyles,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { CurrentUserInterface } from '../../../modules';

const styles = (theme: Theme) => createStyles({
    paper: {
        padding: '20px 24px 12px 24px',
    },
    formControl: {
        marginBottom: theme.spacing.unit * 3,
    },
    gridRow: {
        justifyContent: 'space-between',
        paddingRight: theme.spacing.unit * 5,
    },
    gridRowCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    subtitle: {
        color: '#757575',
        marginBottom: theme.spacing.unit,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

// tslint:disable:no-any
export interface UserSettingsProps {
    user: any;
    handleChangeUserState: (e: any) => void;
    handleChangeRole: (e: any) => void;
    handleChangeUserOTP: (e: any) => void;
    currentUser: CurrentUserInterface;
}
// tslint:enable:no-any

const stateTypes = [
    {
        value: 'Pending',
        key: 'pending',
    },
    {
        value: 'Active',
        key: 'active',
    },
    {
        value: 'Banned',
        key: 'banned',
    },
];

const roleTypes = [
    {
        value: 'Admin',
        key: 'admin',
    },
    {
        value: 'Member',
        key: 'member',
    },
    {
        value: 'Super Admin',
        key: 'superadmin',
    },
    {
        value: 'Accountant',
        key: 'accountant',
    },
    {
        value: 'Compliance',
        key: 'compliance',
    },
    {
        value: 'Technical',
        key: 'technical',
    },
    {
        value: 'Support',
        key: 'support',
    },
    {
        value: 'Trader',
        key: 'trader',
    },
    {
        value: 'Broker',
        key: 'broker',
    },
];

type Props = StyleProps & UserSettingsProps;

class UserSettingsComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            user,
            handleChangeUserState,
            handleChangeRole,
            handleChangeUserOTP,
            currentUser,
        } = this.props;

        return (
            <div className={classes.paper}>
                <Grid container={true}>
                    <Grid item={true} xs={6} className={classes.gridRow}>
                        <Typography variant="h6" className={classes.title}>Settings</Typography>
                        <Grid container={true} item={true} justify={'flex-start'} xs={12}>
                            <FormControl fullWidth={true} className={classes.formControl}>
                                <InputLabel htmlFor="state-label-placeholder">State</InputLabel>
                                <Select
                                    value={user.state}
                                    onChange={handleChangeUserState}
                                    input={<Input id="state-label-placeholder" />}
                                >
                                    {stateTypes.map(option => <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container={true} item={true} justify={'flex-start'} xs={12}>
                            {currentUser && currentUser.role === 'superadmin' &&
                            <FormControl fullWidth={true} className={classes.formControl}>
                                <InputLabel htmlFor="role-label-placeholder">Role</InputLabel>
                                <Select
                                    value={user.role}
                                    onChange={handleChangeRole}
                                    input={<Input id="role-label-placeholder"/>}
                                >
                                    {roleTypes.sort((a, b) => a.value.localeCompare(b.value)).map(option =>
                                        <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>)}
                                </Select>
                            </FormControl>}
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={6} className={classes.gridRowCenter}>
                        <Grid container={true} alignItems={'center'}>
                            <Grid item={true} xs={12}>
                                <Typography variant="caption" gutterBottom={true}>Authorization 2FA</Typography>
                            </Grid>
                            <Grid container={true} item={true} xs={6} justify={'flex-start'} alignItems="center">
                                <Typography>{user.otp ? 'Enabled' : 'Disabled'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container={true} item={true} xs={6} justify="flex-end" alignItems="center">
                            <Switch
                                checked={user.otp}
                                onChange={handleChangeUserOTP}
                                color="primary"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const UserSettings = withStyles(styles)(UserSettingsComponent);
