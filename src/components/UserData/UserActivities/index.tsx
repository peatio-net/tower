import { Typography } from '@material-ui/core';
import * as React from 'react';
import { InfoTable } from '../../InfoTable/InfoTable';
import { TableHeaderItemInterface } from '../UserData';

export interface UserActivityProps {
    // tslint:disable:no-any
    classes: any;
    userActivity: any;
    // tslint:enable:no-any
    rows: TableHeaderItemInterface[];
    page: number;
    rowsPerPage: number;
    total: number;
    handleChangePage: (page: number) => void;
    handleChangeRowsPerPage: (rows: number) => void;
}

export class UserActivities extends React.Component<UserActivityProps> {
    public render() {
        const {
            userActivity,
            classes,
            rowsPerPage,
            page,
            rows,
            handleChangePage,
            handleChangeRowsPerPage,
            total,
        } = this.props;
        const content = userActivity && userActivity.length ? (
            <InfoTable
                dataLength={total}
                rows={rows}
                data={userActivity}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                hidePagination={false}
            />) : (
                <Typography variant="h6" gutterBottom={true} style={{ color: '#757575', paddingLeft: 26, paddingBottom: 26 }}>
                    No user activities
            </Typography>
            );

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom={true} className={classes.title}>
                    User activities
                </Typography>
                {content}
            </React.Fragment>
        );
    }
}
