import {
    createStyles,
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
import * as React from 'react';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {
    tablePageLimit,
} from '../../api/config';
import {
    localeDate,
} from '../../helpers';
import {
    AppState,
    deleteLabel,
    editLabel,
    selectPendingUsers,
    selectUsersTotal,
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
}));

interface StyleProps extends WithStyles<typeof styles> {
}

interface State {
    selectedUsers: string[];
    selectAll: boolean;
    page: number;
    rowsPerPage: number;
}

type Props = RouteComponentProps & DispatchProps & ReduxProps & StyleProps;

class DocumentReviewComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedUsers: [],
            selectAll: false,
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    public componentDidMount(): void {
        this.props.getUsers({
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
        });
    }

    public render() {
        const {users, classes, total} = this.props;
        const {
            page,
            rowsPerPage,
            selectAll,
            selectedUsers,
        } = this.state;

        return (
            <Paper>
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
                                        <Link to={`/tower/users/${user.uid}`} className={classes.link}>{user.email}</Link>
                                    </TableCell>
                                    <TableCell>{user.profile && `${user.profile.first_name} ${user.profile.last_name}`}</TableCell>
                                    <TableCell>{user.profile && user.profile.country}</TableCell>
                                    <TableCell style={{ textAlign: 'right' }}>{user.created_at && localeDate(user.created_at, 'shortDate')}</TableCell>
                                    <TableCell>
                                        <div className={classes.attachments}>
                                            1 <AttachFile className={classes.greyIcon} />
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
            </Paper>
        );
    }

    private getIcon = (condition: boolean, onClick?: () => void) => (
        condition ?
            <CheckBox className={this.props.classes.blueIcon} onClick={onClick}/> :
            <CheckBoxOutlineBlank className={this.props.classes.greyIcon} onClick={onClick}/>
    );

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.setState({page});
        this.props.getUsers({
            limit: this.state.rowsPerPage,
            page: page + 1,
        });
    };

    // tslint:disable-next-line:no-any
    private handleChangeRowsPerPage = (event: any) => {
        this.setState({
            rowsPerPage: event.target.value,
        });
        this.props.getUsers({
            limit: event.target.value,
            page: this.state.page + 1,
        });
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

        this.setState({
            selectedUsers: selectedList,
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
    };

    private deleteSelected = () => {
        const {selectedUsers} = this.state;
        selectedUsers.map(user => {
            this.props.deleteLabel({ uid: user, key: 'document', scope: 'private' });
        });
    };

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        users: selectPendingUsers(state),
        total: selectUsersTotal(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        logout: () => dispatch(logout()),
        getUsers: payload => dispatch(getUsersWithPendingDocuments(payload)),
        deleteLabel: payload => dispatch(deleteLabel(payload)),
        editLabel: payload => dispatch(editLabel(payload)),
    });

export const DocumentReview = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentReviewComponent)));
