import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
    tablePageLimit,
} from '../../api/config';
import {
    UserData,
} from '../../components';
import {
    addNewLabel,
    alertPush,
    AppState,
    changeUserOTP,
    changeUserRole,
    changeUserState,
    CurrentUserInterface,
    deleteLabel,
    editLabel,
    getUserActivity,
    getUserData,
    selectCurrentUser,
    selectTotalNumber,
    selectUserActivity,
    selectUserActivityCurrentPage,
    selectUserActivityLoading,
    selectUserData,
    UserActivityDataInterface,
} from '../../modules';

interface ReduxProps {
    // tslint:disable-next-line:no-any
    userData: any;
    loading: boolean;
    total: number;
    page: number;
    userActivity: UserActivityDataInterface[];
    currentUser: CurrentUserInterface;
}

interface DispatchProps {
    addNewLabel: typeof addNewLabel;
    editLabel: typeof editLabel;
    changeUserState: typeof changeUserState;
    changeUserRole: typeof changeUserRole;
    changeUserOTP: typeof changeUserOTP;
    deleteLabel: typeof deleteLabel;
    getUserData: typeof getUserData;
    getUserActivity: typeof getUserActivity;
    alertPush: typeof alertPush;
}

interface OwnProps {
    // tslint:disable-next-line:no-any
    match: any;
    history: History;
    location: {
        pathname: string;
    };
}

interface UserInfoState {
    openAddLabelModal: boolean;
    openEditLabelModal: boolean;
    openDocumentCarousel: boolean;
    nameLabel: string;
    valueLabel: string;
    scopeLabel: string;
    page: number;
    rowsPerPage: number;
    documentIndex: number;
}

type Props = ReduxProps & DispatchProps & RouteProps & OwnProps;

class UserInfoScreen extends React.Component<Props, UserInfoState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            openAddLabelModal: false,
            openEditLabelModal: false,
            openDocumentCarousel: false,
            nameLabel: '',
            valueLabel: '',
            scopeLabel: 'private',
            page: 0,
            rowsPerPage: tablePageLimit(),
            documentIndex: 0,
        };
    }

    private documentsRows = [
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'doc_number', alignRight: false, label: 'Doc number' },
        { key: 'doc_expire', alignRight: true, label: 'Doc expire' },
        { key: 'upload', alignRight: true, label: 'Attachments' },
    ];

    private activityRows = [
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'action', alignRight: false, label: 'Action' },
        { key: 'result', alignRight: false, label: 'Result' },
        { key: 'user_ip', alignRight: true, label: 'IP' },
        { key: 'browser', alignRight: true, label: 'Browser' },
        { key: 'os', alignRight: true, label: 'OS' },
    ];

    public componentDidMount() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        this.props.getUserData({ uid: this.props.match.params.uid });
        this.props.getUserActivity({ page: page + 1, limit: rowsPerPage, uid: this.props.match.params.uid });
    }

    public render() {
        const {
            openAddLabelModal,
            openEditLabelModal,
            openDocumentCarousel,
            nameLabel,
            valueLabel,
            scopeLabel,
            page,
            rowsPerPage,
            documentIndex,
        } = this.state;

        return (
            <React.Fragment>
                {this.props.userData && !this.props.loading
                    ? (
                        <UserData
                            documentsRows={this.documentsRows}
                            addNewLabel={this.addLabel}
                            editLabel={this.editLabel}
                            changeLabelName={this.changeNameForNewLabel}
                            changeLabelScope={this.changeScopeForNewLabel}
                            changeLabelValue={this.changeValueForNewLabel}
                            closeModal={this.handleCloseModal}
                            deleteUserLabel={this.deleteLabel}
                            handleChangeUserState={this.handleChangeUserState}
                            handleChangeRole={this.handleChangeRole}
                            handleChangeUserOTP={this.handleChangeUserOTP}
                            newLabelName={nameLabel}
                            newLabelScope={scopeLabel}
                            newLabelValue={valueLabel}
                            isAddLabelModalOpened={openAddLabelModal}
                            isEditLabelModalOpened={openEditLabelModal}
                            openAddLabelModal={this.handleOpenAddLabelModal}
                            openEditLabelModal={this.handleOpenEditLabelModal}
                            user={this.props.userData}
                            handleEditLabel={this.handleEditLabel}
                            activityRows={this.activityRows}
                            userActivity={this.props.userActivity}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            total={this.props.total}
                            goBack={this.goBack}
                            pathname={location.pathname}
                            currentUser={this.props.currentUser}
                            alertPush={this.props.alertPush}
                            handleCloseDocumentCarousel={this.handleCloseDocumentCarousel}
                            handleOpenDocumentCarousel={this.handleOpenDocumentCarousel}
                            openDocumentCarousel={openDocumentCarousel}
                            documentIndex={documentIndex}
                            handleNavigateDocumentCarousel={this.handleNavigateDocumentCarousel}
                        />
                    ) : 'Loading'
                }
            </React.Fragment>
        );
    }

    private goBack = event => {
        event.preventDefault();
        this.props.history.goBack();
    };

    private handleCloseModal = () => {
        this.setState({
            openAddLabelModal: false,
            openEditLabelModal: false,
        });
    };

    private handleOpenAddLabelModal = () => {
        this.setState({
            openAddLabelModal: true,
        });
    };

    private handleOpenDocumentCarousel = (index: number) => {
        this.setState({ openDocumentCarousel: true, documentIndex: index });
    };

    private handleCloseDocumentCarousel = () => {
        this.setState({ openDocumentCarousel: false });
    };

    private handleNavigateDocumentCarousel = (index: number) => {
        this.setState({ documentIndex: index });
    };

    private handleOpenEditLabelModal = (key: string, value: string, scope: string) => {
        this.setState({
            openEditLabelModal: true,
            nameLabel: key,
            valueLabel: value,
            scopeLabel: scope,
        });
    };

    private deleteLabel = (uid: string, key: string, scope: string) => {
        this.props.deleteLabel({uid: uid, key: key, scope: scope});
    };

    private changeNameForNewLabel = (value: string) => {
        this.setState({
            nameLabel: value,
        });
    };

    private changeValueForNewLabel = (value: string) => {
        this.setState({
            valueLabel: value,
        });
    };

    private changeScopeForNewLabel = (value: string) => {
        this.setState({
            scopeLabel: value,
        });
    };

    private addLabel = () => {
        const { nameLabel, valueLabel, scopeLabel } = this.state;
        const { uid } = this.props.userData;

        const requestProps = {
            key: nameLabel,
            value: valueLabel,
            scope: scopeLabel,
            uid: uid,
        };

        this.props.addNewLabel(requestProps);
        this.changeNameForNewLabel('');
        this.changeValueForNewLabel('');
    };

    private editLabel = () => {
        const { nameLabel, valueLabel, scopeLabel } = this.state;
        const { uid } = this.props.userData;

        const requestProps = {
            key: nameLabel,
            value: valueLabel,
            scope: scopeLabel,
            uid: uid,
        };

        this.props.editLabel(requestProps);
        this.changeNameForNewLabel('');
        this.changeValueForNewLabel('');
    };

    private handleEditLabel = (key: string, value: string, scope: string) => {
        const { uid } = this.props.userData;

        this.setState({
            nameLabel: key,
            valueLabel: value,
            scopeLabel: scope,
        });

        const requestProps = {
            key: key,
            value: value,
            scope: scope,
            uid: uid,
        };

        this.props.editLabel(requestProps);
        this.changeNameForNewLabel('');
        this.changeValueForNewLabel('');
    };

    // tslint:disable-next-line:no-any
    private handleChangeUserState = (e: any) => {
        const { uid } = this.props.userData;
        this.props.changeUserState({uid: uid, state : e.target.value});
    };

    // tslint:disable-next-line:no-any
    private handleChangeRole = (e: any) => {
        const { uid } = this.props.userData;
        this.props.changeUserRole({uid: uid, role: e.target.value});
    };

    // tslint:disable-next-line:no-any
    private handleChangeUserOTP = (e: any) => {
        if (!e.target.checked){
            const { uid } = this.props.userData;
            this.props.changeUserOTP({uid: uid, otp: e.target.checked});
        } else {
            this.props.alertPush({
                message: ['2FA can only be enabled by the user'],
                type: 'error',
            });
        }
    };

    private handleChangePage = (page: number) => {
        this.setState({ page: Number(page) });
        this.handleGetUserActivity(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            rowsPerPage: rows,
            page: 0,
        });
        this.handleGetUserActivity(rows, 0);
    };

    private handleGetUserActivity = (limit: number, page: number) => {
        const { userData } = this.props;
        const uid = userData.uid;

        this.props.getUserActivity({ limit, page: page + 1, uid });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        userData: selectUserData(state),
        userActivity: selectUserActivity(state),
        loading: selectUserActivityLoading(state),
        total: selectTotalNumber(state),
        page: selectUserActivityCurrentPage(state),
        currentUser: selectCurrentUser(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        addNewLabel: payload => dispatch(addNewLabel(payload)),
        editLabel: payload => dispatch(editLabel(payload)),
        changeUserState: payload => dispatch(changeUserState(payload)),
        changeUserRole: payload => dispatch(changeUserRole(payload)),
        changeUserOTP: payload => dispatch(changeUserOTP(payload)),
        deleteLabel:payload => dispatch(deleteLabel(payload)),
        getUserData: payload => dispatch(getUserData(payload)),
        getUserActivity: params => dispatch(getUserActivity(params)),
        alertPush: params => dispatch(alertPush(params)),
    });

export const UserInfoPage = connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen);

// tslint:disable-next-line:no-any
export const UserInfo = withRouter(UserInfoPage as any);
