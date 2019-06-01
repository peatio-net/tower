import { Typography } from '@material-ui/core';
import * as React from 'react';
import { InfoTable } from '../../InfoTable';
import { TableHeaderItemInterface } from '../index';

export interface UserDocumentProps {
    // tslint:disable:no-any
    user: any;
    classes: any;
    // tslint:enable:no-any
    documentsRows: TableHeaderItemInterface[];
}

export class UserDocument extends React.Component<UserDocumentProps> {
    public render() {
        const {user, classes} = this.props;
        const content = user && user.documents && user.documents.length ? (
            <InfoTable
                dataLength={this.props.documentsRows.length}
                rows={this.props.documentsRows}
                data={user.documents}
                rowsPerPage={user.documents.length}
                hidePagination={true}
            />) : (
            <Typography variant="h6" gutterBottom={true} style={{ color: '#757575', paddingLeft: 26, paddingBottom: 26}}>
                No documents
            </Typography>
        );

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom={true} className={classes.title}>
                    Documents
                </Typography>
                {content}
            </React.Fragment>
        );
    }
}
