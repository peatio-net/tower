import {
    createStyles,
    Grid,
    Paper,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { DocumentCarousel } from '../';
import { CurrentUserInterface } from '../../modules';
import { UserActivities } from './UserActivities';
import { UserDataHeader } from './UserDataHeader';
import { UserDocument } from './UserDocument';
import { UserKYC } from './UserKYC';
import { UserLabel } from './UserLabel';
import { UserSettings } from './UserSettings';
import { UserSummary } from './UserSummary';

export interface TableHeaderItemInterface {
    key: string;
    alignRight: boolean;
    label: string;
}

export interface UserDataProps {
    addNewLabel: () => void;
    editLabel: (key: string, value: string, scope: string) => void;
    changeLabelName: (value: string) => void;
    changeLabelScope: (value: string) => void;
    changeLabelValue: (value: string) => void;
    closeModal: () => void;
    deleteUserLabel: (uid: string, key: string, scope: string) => void;
    // tslint:disable-next-line:no-any
    handleChangeUserState: (e: any) => void;
    // tslint:disable-next-line:no-any
    handleChangeRole: (e: any) => void;
    // tslint:disable-next-line:no-any
    handleChangeUserOTP: (e: any) => void;
    newLabelName: string;
    newLabelScope: string;
    newLabelValue: string;
    isAddLabelModalOpened: boolean;
    isEditLabelModalOpened: boolean;
    openAddLabelModal: () => void;
    openEditLabelModal: (key: string, value: string, scope: string) => void;
    // tslint:disable-next-line:no-any
    user: any;
    documentsRows: TableHeaderItemInterface[];
    handleEditLabel: (key: string, value: string, scope: string) => void;
    activityRows: TableHeaderItemInterface[];
    // tslint:disable-next-line:no-any
    userActivity: any;
    page: number;
    rowsPerPage: number;
    total: number;
    handleChangePage: (page: number) => void;
    handleChangeRowsPerPage: (rows: number) => void;
    // tslint:disable-next-line:no-any
    goBack: (event: any) => void;
    pathname: string;
    currentUser: CurrentUserInterface;
    alertPush: ({type, message}) => void;
    handleOpenDocumentCarousel: (index: number) => void;
    handleCloseDocumentCarousel: () => void;
    openDocumentCarousel: boolean;
    documentIndex: number;
    handleNavigateDocumentCarousel: (index: number) => void;
}

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '75%',
    },
    menu: {
        width: 200,
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        fontSize: '16px',
        letterSpacing: '0.44px',
    },
    arrow: {
        color: '#979797',
        paddingTop: '3px',
        margin: '0 10px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 24px 24px 0',
        fontWeight: 600,
    },
    label: {
        height: 32,
        paddingLeft: 16,
        borderRadius: 24,
        width: 'auto',
        cursor: 'pointer',
        letterSpacing: '0.15px',
        fontWeight: 600,
    },
    icon: {
        width: 20,
        height: 20,
        margin: '7px 4px',
        cursor: 'pointer',
        opacity: 0.6,
    },
    labelName: {
        paddingTop: 5,
        color: '#ffffff',
        fontSize: 14,
        marginRight: 7,
        letterSpacing: '0.25px',
    },
    paper: {
        padding: '20px 24px 24px 24px',
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        letterSpacing: '0.15px',
        fontWeight: 600,
        paddingLeft: 26,
        paddingTop: 26,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

type Props = StyleProps & UserDataProps;

class UserDataComponent extends React.Component<Props> {

    public render() {
        const {
            classes,
            user,
            newLabelName,
            newLabelValue,
            newLabelScope,
            addNewLabel,
            editLabel,
            deleteUserLabel,
            changeLabelName,
            changeLabelScope,
            changeLabelValue,
            isAddLabelModalOpened,
            isEditLabelModalOpened,
            openAddLabelModal,
            openEditLabelModal,
            closeModal,
            handleChangeUserState,
            handleChangeRole,
            handleChangeUserOTP,
            documentsRows,
            handleEditLabel,
            userActivity,
            activityRows,
            page,
            rowsPerPage,
            handleChangePage,
            handleChangeRowsPerPage,
            total,
            goBack,
            pathname,
            currentUser,
            alertPush,
            handleCloseDocumentCarousel,
            handleOpenDocumentCarousel,
            openDocumentCarousel,
            documentIndex,
            handleNavigateDocumentCarousel,
        } = this.props;

        return (
            <div className="user-data">
                <UserDataHeader classes={classes} user={user.email} goBack={goBack} pathname={pathname}/>
                <Grid container={true} spacing={24} direction={'row'}>
                    <Grid item={true} xs={12} lg={6}>
                        <Paper style={{padding: 20}}>
                            <UserSummary
                                user={user}
                            />
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} lg={6}>
                        <Paper style={{ marginBottom: 24 }}>
                            <UserKYC
                                user={user}
                                editLabel={handleEditLabel}
                                alertPush={alertPush}
                            />
                        </Paper>
                        <Paper style={{marginBottom: 24}}>
                            <UserSettings
                                user={user}
                                handleChangeUserState={handleChangeUserState}
                                handleChangeRole={handleChangeRole}
                                handleChangeUserOTP={handleChangeUserOTP}
                                currentUser={currentUser}
                            />
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} lg={12}>
                        <Paper>
                            <UserLabel
                                user={user}
                                newLabelName={newLabelName}
                                newLabelValue={newLabelValue}
                                newLabelScope={newLabelScope}
                                addNewLabel={addNewLabel}
                                editLabel={editLabel}
                                deleteUserLabel={deleteUserLabel}
                                changeLabelName={changeLabelName}
                                changeLabelScope={changeLabelScope}
                                changeLabelValue={changeLabelValue}
                                isAddLabelModalOpened={isAddLabelModalOpened}
                                isEditLabelModalOpened={isEditLabelModalOpened}
                                openAddLabelModal={openAddLabelModal}
                                openEditLabelModal={openEditLabelModal}
                                closeModal={closeModal}
                                classes={classes}
                            />
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} lg={12}>
                        <Paper style={{ marginBottom: 15 }}>
                            <UserDocument
                                user={user}
                                documentsRows={documentsRows}
                                classes={classes}
                                handleOpenDocumentCarousel={handleOpenDocumentCarousel}
                            />
                            {openDocumentCarousel &&
                                <DocumentCarousel
                                    documents={user.documents}
                                    documentIndex={documentIndex}
                                    handleClose={handleCloseDocumentCarousel}
                                    handleNavigate={handleNavigateDocumentCarousel}
                                />
                            }
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} lg={12}>
                        <Paper style={{ marginBottom: 15 }}>
                            <UserActivities
                                userActivity={userActivity}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                rows={activityRows}
                                classes={classes}
                                total={total}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export const UserData = withStyles(styles)(UserDataComponent);
