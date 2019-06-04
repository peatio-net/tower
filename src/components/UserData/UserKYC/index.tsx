import {
    createStyles,
    Grid,
    Switch,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { localeDate } from '../../../helpers';
import { icons } from './icons';

const styles = (theme: Theme) => createStyles({
    paper: {
        padding: '20px 24px 12px 0px',
    },
    formControl: {
        marginBottom: theme.spacing.unit * 3,
    },
    gridRow: {
        justifyContent: 'space-between',
        paddingRight: theme.spacing.unit * 3,
    },
    gridColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridRowWithDivider: {
        borderColor: '#e8e8e8',
        border: 0,
        borderLeft: 1,
        borderStyle: 'solid',
        justifyContent: 'space-between',
        marginTop: theme.spacing.unit * 1.5,
        marginBottom: theme.spacing.unit * 1.5,
        height: '15px',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    info: {
        opacity: 0.72,
        letterSpacing: '0.25px',
        marginBottom: theme.spacing.unit * 2,
    },
    level: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

// tslint:disable:no-any
export interface UserKYCProps {
    user: any;
    editLabel: (key: string, value: string, scope: string) => void;
    alertPush: ({ message, type }) => void;
}
// tslint:enable:no-any

type Props = StyleProps & UserKYCProps;

class UserKYCComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
        } = this.props;

        return (
            <div className={classes.paper}>
                <Grid container={true}>
                    <Grid item={true} xs={12} className={classes.gridRow}>
                        <Typography variant="h6" className={classes.title}>KYC verification</Typography>
                    </Grid>

                    <Grid item={true} xs={1} className={classes.gridColumn} style={{ alignItems: 'center', marginTop: 10 }}>
                        {this.checkLabel('email') ? icons('success') : icons('email')}
                        <div className={classes.gridRowWithDivider} />
                        {this.checkLabel('phone') ? icons('success') : icons('phone')}
                        <div className={classes.gridRowWithDivider} />
                        {this.checkLabel('document') ? icons('success') : icons('document')}
                    </Grid>
                    <Grid item={true} container={true} xs={11} className={classes.gridColumn}>
                        {['Email', 'Phone', 'Document'].map((item, index) => this.getRow(item, index))}
                    </Grid>
                </Grid>
            </div>
        );
    }

    private checkLabel = (key: string) => {
        const { user } = this.props;
        return user.labels.find(label => label.key === key && label.value === 'verified');
    }

    private getRow = (key: string, index: number) => {
        const { user, classes } = this.props;
        const status = this.checkLabel(key.toLowerCase()) ? 'verified' : 'verification';

        return (
            <Grid item={true} className={classes.level} key={key}>
                <Grid item={true} className={classes.gridColumn} style={{ alignItems: 'flex-start' }} xs={11}>
                    <Typography variant="subtitle1" style={{ letterSpacing: '0.44px' }}>
                        {key} {status}
                    </Typography>
                    <Typography variant="body2" className={classes.info}>
                        {status === 'verified' ? `Level ${index + 1} completed at ${localeDate(user.labels.find(label => label.key === key.toLowerCase()).updated_at, 'shortDate')}` : `Confirm the ${key}`}
                    </Typography>
                </Grid>
                <Grid item={true} className={classes.gridColumn}>
                    <Switch
                        checked={status === 'verified'}
                        onChange={this.onClick(key.toLowerCase())}
                        color="primary"
                    />
                </Grid>
            </Grid>
        );
    };

    private onClick = (key: string) => () => {
        const { user } = this.props;
        const label = user.labels.find(item => item.key === key);
        if (!label) {
            this.props.alertPush({
                message: ['Label doesn\'t exist'],
                type: 'error',
            });
        } else if (label.value === 'verified') {
            this.props.editLabel(key, 'rejected', label.scope);
        } else {
            this.props.editLabel(key, 'verified', label.scope);
        }
    };
}

export const UserKYC = withStyles(styles)(UserKYCComponent);
