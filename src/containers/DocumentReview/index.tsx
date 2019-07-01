import {
    createStyles,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,
    Typography, WithStyles, withStyles,
} from '@material-ui/core';
import {
    AttachFile,
    Block,
    CheckBox,
    CheckBoxOutlineBlank,
    CheckCircle,
} from '@material-ui/icons';
import { History } from 'history';
import * as React from 'react';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import { SearchBarContainer, SearchBarRequestInterface } from '../';
import {
    tablePageLimit,
} from '../../api/config';
import { DocumentCarousel } from '../../components';
import {
    convertToObj,
    localeDate,
} from '../../helpers';
import {
    AppState,
    deleteLabel,
    editLabel,
    selectPendingTotal,
    selectPendingUsers,
    UserInterface,
} from '../../modules';
import {logout} from '../../modules/auth';
import {getUsersWithPendingDocuments} from '../../modules/user';

interface DispatchProps {
    logout: typeof logout;
    getUsers: typeof getUsersWithPendingDocuments;
    editLabel: typeof editLabel;
    deleteLabel: typeof deleteLabel;
}

interface ReduxProps {
    users: UserInterface[];
    total: number;
}

interface RouterProps {
    history: History;
    location: {
        pathname: string;
    };
}

const styles = () => (createStyles({
    header: {
        padding: 20,
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        fontSize: '16px',
    },
    greyIcon: {
        cursor: 'pointer',
        color: '#979797',
    },
    greenIcon: {
        color: '#00A41A',
        cursor: 'pointer',
    },
    redIcon: {
        color: '#E23328',
        cursor: 'pointer',
    },
    blueIcon: {
        cursor: 'pointer',
        color: '#309CEA',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    attachments: {
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    emptyTable: {
        padding: 15,
    },
    button: {
        '&:hover': {
            backgroundColor: '#ffffff',
          },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#ffffff',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
}

interface State {
    selectedUsers: string[];
    selectAll: boolean;
    page: number;
    rowsPerPage: number;
    activeSelectItem: {
        value: string;
        label: string;
    };
    request: SearchBarRequestInterface[];
    documentIndex: number;
    openDocumentCarousel: boolean;
    userUID: string;
}

type Props = RouteComponentProps & DispatchProps & ReduxProps & StyleProps & RouterProps;

class DocumentReviewComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedUsers: [],
            selectAll: false,
            page: 0,
            rowsPerPage: tablePageLimit(),
            activeSelectItem: this.selectedValues[0],
            request: [{
                property: '',
                value: '',
            }],
            documentIndex: 0,
            openDocumentCarousel: false,
            userUID: '',
        };
    }

    private selectedValues = [
        {
            label: 'UID',
            value: 'uid',
            checked: false,
        },
        {
            label: 'Email',
            value: 'email',
            checked: false,
        },
        {
            label: 'Role',
            value: 'role',
            checked: false,
        },
        {
            label: 'First name',
            value: 'first_name',
            checked: false,
        },
        {
            label: 'Last name',
            value: 'last_name',
            checked: false,
        },
        {
            label: 'Country',
            value: 'country',
            checked: false,
        },
        {
            label: 'Level',
            value: 'level',
            checked: false,
        },
        {
            label: 'State',
            value: 'state',
            checked: false,
        },
    ];


    public componentDidMount(): void {
        this.props.getUsers({
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
        });
    }


    public componentDidUpdate(prev: Props) {
        if (prev.total !== this.props.total) {
            this.filterSelected();
        }
    }


    public render() {
        const { users, classes } = this.props;

        return (
            <React.Fragment>
                <SearchBarContainer
                    selectedItems={this.selectedValues}
                    handleSearchRequest={this.handleSearch}
                    handleClearSearchRequest={this.handleClearSearchRequest}
                />
                <Paper style={{ marginTop: 25 }}>
                    {users[0] && this.renderContent()}
                    {!users.length && <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </React.Fragment>
        );
    }

    private renderContent = () => {
        const {
            page,
            rowsPerPage,
            selectAll,
            selectedUsers,
            openDocumentCarousel,
            documentIndex,
        } = this.state;
        const { users, classes, total, location } = this.props;

        return (
            <React.Fragment>
                <Typography variant="h6" className={classes.header}>
                    Pending documents
                    <div style={{display: 'flex', minWidth: 80, justifyContent: 'space-between'}}>
                        <CheckCircle className={selectedUsers.length > 0 ? classes.greenIcon : classes.greyIcon} onClick={this.approveSelected}/>
                        <Block className={selectedUsers.length > 0 ? classes.redIcon : classes.greyIcon} onClick={this.deleteSelected}/>
                    </div>
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {this.getIcon(selectAll, this.handleSelectAll())}
                            </TableCell>
                            {['Email', 'Name', 'Country', 'Date', 'Attachments'].map((s: string, index: number) => {
                                // tslint:disable-next-line:no-any
                                const style = {fontWeight: 600, color: '#263238'} as any;
                                style.textAlign = index > 2 ? 'right' : 'left';
                                return (
                                    <TableCell key={s} style={style}>
                                        {s}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user: UserInterface) => {
                            return (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        {this.getIcon(selectedUsers.filter(x => x === user.uid).length > 0, this.handleClick(user.uid))}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`${location.pathname}/${user.uid}`} className={classes.link}>{user.email}</Link>
                                    </TableCell>
                                    <TableCell>{user.profile && `${user.profile.first_name} ${user.profile.last_name}`}</TableCell>
                                    <TableCell>{user.profile && user.profile.country}</TableCell>
                                    <TableCell style={{ textAlign: 'right' }}>{user.created_at && localeDate(user.created_at, 'shortDate')}</TableCell>
                                    <TableCell>
                                        <div className={classes.attachments}>
                                            {user && user.documents && user.documents.length || 0} {this.renderAttachments(user)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TablePagination
                                count={Number(total)}
                                onChangePage={this.handleChangePage}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} from ${count}`}
                                classes={{ selectIcon: classes.selectIcon }}
                            />
                        </TableRow>
                    </TableBody>
                </Table>

                {openDocumentCarousel &&
                    <DocumentCarousel
                        documents={this.getUserDocuments()}
                        documentIndex={documentIndex}
                        handleClose={this.handleCloseDocumentCarousel}
                        handleNavigate={this.handleNavigateDocumentCarousel}
                    />
                }
            </React.Fragment>
        );
    }

    private getIcon = (condition: boolean, onClick?: () => void) => (
        condition ?
            <CheckBox className={this.props.classes.blueIcon} onClick={onClick}/> :
            <CheckBoxOutlineBlank className={this.props.classes.greyIcon} onClick={onClick}/>
    );

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.setState({ page });
        this.handleGetRequestData(this.state.rowsPerPage, page);
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: event.target.value });
        this.handleGetRequestData(event.target.value, this.state.page);
    };

    private handleGetRequestData = (limit: number, page: number) => {
        const { request } = this.state;
        const requestParams = request ? convertToObj(request) : '';

        this.props.getUsers({
            limit: limit,
            page: page + 1,
            ...requestParams,
        });
    };

    private handleSearch = (requestData: SearchBarRequestInterface[]) => {
        this.setState({ request: requestData });
        const params = convertToObj(requestData);

        this.props.getUsers({
            limit: this.state.rowsPerPage,
            page: 1,
            ...params,
        });
    }

    private filterSelected = () => {
        const { users } = this.props;
        const { selectedUsers } = this.state;
        let selectedList: string[] = [];

        users && users.map((user: UserInterface) => {
            selectedList.push(selectedUsers.find(x => x === user.uid) || '');
        });

        selectedList = selectedList.filter(i => i !== '');

        const isAll = selectedList.length === this.props.users.length;

        this.setState({
            selectedUsers: selectedList,
            selectAll: isAll,
        });
    }

    private handleClearSearchRequest = () => {
        this.setState({
            request: [{
                property: '',
                value: '',
            }],
        });
        this.props.getUsers({ limit: this.state.rowsPerPage, page: 1 });
    };

    private handleClick = (key: string) => () => {
        const {selectedUsers} = this.state;
        let selectedList: string[];
        const isSelected = selectedUsers.find(x => x === key);

        if (isSelected) {
            selectedList = selectedUsers.filter(x => x !== key);
            this.setState({selectAll: false});
        } else {
            selectedList = selectedUsers;
            selectedList.push(key);
        }

        const isAll = selectedList.length === this.props.users.length;

        this.setState({
            selectedUsers: selectedList,
            selectAll: isAll,
        });
    };

    private handleSelectAll = () => () => {
        const {users} = this.props;
        const {selectAll} = this.state;
        const selectedList: string[] = [];

        !selectAll && users && users.map((user: UserInterface) => {
            selectedList.push(user.uid);
        });

        this.setState({
            selectedUsers: selectedList,
            selectAll: !this.state.selectAll,
        });
    };

    private approveSelected = () => {
        const { selectedUsers } = this.state;

        selectedUsers.map(user =>  {
            this.props.editLabel({ uid: user, value: 'verified', key: 'document', scope: 'private' });
        });

        this.setState({
            selectedUsers: [],
        });
    };

    private deleteSelected = () => {
        const {selectedUsers} = this.state;
        selectedUsers.map(user => {
            this.props.deleteLabel({ uid: user, key: 'document', scope: 'private' });
        });

        this.setState({
            selectedUsers: [],
        });
    };

    private renderAttachments = (user: UserInterface) => {
        const { classes } = this.props;
        return (
            <IconButton
                onClick={this.handleOpenDocumentCarousel(user.uid)}
                disabled={!(user && user.documents && user.documents.length)}
                disableRipple={true}
                disableTouchRipple={true}
                className={classes.button}
            >
                <AttachFile className={classes.greyIcon} />
            </IconButton>
        );
    };

    private handleOpenDocumentCarousel = (uid: string) => () => {
        this.setState({
            openDocumentCarousel: true,
            documentIndex: 0,
            userUID: uid,
        });
    };

    private handleCloseDocumentCarousel = () => {
        this.setState({ openDocumentCarousel: false });
    };

    private handleNavigateDocumentCarousel = (index: number) => {
        this.setState({ documentIndex: index });
    };

    private getUserDocuments = () => {
        const { userUID } = this.state;
        const { users } = this.props;
        const selectedUser = users && users.find(user => user.uid === userUID);

        return selectedUser && selectedUser.documents || [];
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        users: selectPendingUsers(state),
        total: selectPendingTotal(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        logout: () => dispatch(logout()),
        getUsers: payload => dispatch(getUsersWithPendingDocuments(payload)),
        deleteLabel: payload => dispatch(deleteLabel(payload)),
        editLabel: payload => dispatch(editLabel(payload)),
    });

// tslint:disable-next-line:no-any
export const DocumentReview = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentReviewComponent as any)));
