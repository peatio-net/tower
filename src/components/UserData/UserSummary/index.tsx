import {
    createStyles,
    Grid,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import Countries = require('country-data');
import * as React from 'react';
import { findPhone, localeDate } from '../../../helpers';

const styles = (theme: Theme) => createStyles({
    gridRow: {
        justifyContent: 'space-between',
        marginTop: 20,
    },
    title: {
        color: '#757575',
    },
    paper: {
        padding: '8px',
    },
    label: {
        letterSpacing: '0.15px',
        paddingBottom: '0px',
        fontWeight: 600,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

// tslint:disable:no-any
export interface UserSummaryProps {
    user: any;
}
// tslint:enable:no-any

type Props = StyleProps & UserSummaryProps;

class UserSummaryComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            user,
        } = this.props;

        return (
            <div className={classes.paper}>
                <Typography gutterBottom={true} variant="h6" className={classes.label}>
                    {user.email}
                </Typography>
                <Grid item={true}>
                    <Typography style={{ color: '#757575', fontSize: '12px'}}>
                        Last activity: {localeDate(user.updated_at, 'fullDate')}
                    </Typography>
                </Grid>
                <br/>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>UID</Typography>
                        <Typography gutterBottom={true}>{user.uid}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Created at</Typography>
                        <Typography gutterBottom={true}>{localeDate(user.created_at, 'shortDate') || '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>First name</Typography>
                        <Typography gutterBottom={true}>{user.profile !== null ? user.profile.first_name : '-'}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Last name</Typography>
                        <Typography gutterBottom={true}>{user.profile !== null ? user.profile.last_name : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Phone number</Typography>
                        <Typography gutterBottom={true}>{user.phones.length > 0 ? findPhone(user.phones).number : '-'}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Day of Birth</Typography>
                        <Typography gutterBottom={true}>{user.profile !== null ? localeDate(user.profile.dob, 'date') : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Citizenship</Typography>
                        <Typography gutterBottom={true} >{user.profile !== null ? user.profile.metadata !== null && user.profile.metadata.nationality : '-'}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Country</Typography>
                        <Typography gutterBottom={true} >{user.profile !== null ? this.displayCountry(user.profile.country) : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>City</Typography>
                        <Typography gutterBottom={true}>{user.profile !== null ? user.profile.city : '-'}</Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Address</Typography>
                        <Typography gutterBottom={true} >{user.profile !== null ? user.profile.address : '-'}</Typography>
                    </Grid>
                </Grid>
                <Grid container={true} className={classes.gridRow}>
                    <Grid item={true} xs={6}>
                        <Typography gutterBottom={true} className={classes.title}>Postcode</Typography>
                        <Typography gutterBottom={true}>{user.profile !== null ? user.profile.postcode : '-'}</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private displayCountry = (code: string) => {
        if (code === 'null') {
            return '-';
        } else if (Countries.countries[code.toUpperCase()] !== undefined) {
            return Countries.countries[code.toUpperCase()].name;
        }
        return code;
    }
}

export const UserSummary = withStyles(styles)(UserSummaryComponent);
