import {
    Grid,
    Typography,
} from '@material-ui/core';
import * as React from 'react';

export interface UserDataHeaderProps {
    // tslint:disable-next-line:no-any
    classes: any;
}

export class UserDataHeader extends React.Component<UserDataHeaderProps> {
    public render() {
        return (
            <Grid container={true}>
                <Typography variant="h4" gutterBottom={true} component="h4" style={{color: '#3598D5'}}>
                    Account info
                </Typography>
            </Grid>
        );
    }
}
