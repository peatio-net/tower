import {
    Grid,
    Typography,
} from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import * as React from 'react';

export interface UserDataHeaderProps {
    // tslint:disable-next-line:no-any
    classes: any;
    user: string;
    // tslint:disable-next-line:no-any
    goBack: (event: any) => void;
    pathname: string;
}

export class UserDataHeader extends React.Component<UserDataHeaderProps> {
    public render() {
        const { classes, user, pathname } = this.props;

        const path = pathname.includes('/tower/users') ?
            'User Directory' :
            pathname.includes('/tower/pending') ?
            'Pending Documents' :
            pathname.includes('/tower/admin-activities') ?
            'Admin Activities' :
            'User Activities';

        return (
            <Grid container={true} className={classes.header}>
                <Typography variant="subheading" onClick={this.props.goBack} className={classes.link}>
                    {path}
                </Typography>
                <KeyboardArrowRight className={classes.arrow}/>
                <Typography variant="subheading" style={{ letterSpacing: '0.44px' }}>
                    {user}
                </Typography>
            </Grid>
        );
    }
}
