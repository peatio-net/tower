import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBarContainer, SearchBarRequestInterface } from '../';
import {
    tablePageLimit,
} from '../../api/config';
import {
    UsersTable,
} from '../../components';
import { convertToObj } from '../../helpers';
import {
    AppState,
    getDataByFilter,
    getUsers,
    getUsersByLabel,
    selectUsers,
    selectUsersTotal,
    UserInterface,
} from '../../modules';

interface UserTableState {
    page: number;
    rowsPerPage: number;
    searchValue: string;
    activeSelectItem: {
        value: string;
        label: string;
    };
    data: SearchBarRequestInterface[];
}

interface ReduxProps {
    total: number;
    users: UserInterface[];
}

interface DispatchProps {
    getUsers: typeof getUsers;
    getDataByFilter: typeof getDataByFilter;
    getUsersByLabel: typeof getUsersByLabel;
}

interface RouterProps {
    history: History;
    location: {
        hash: string;
        pathname: string;
    };
}

type Props = ReduxProps & DispatchProps & RouterProps;

class DashboardUserTable extends React.Component<Props, UserTableState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            searchValue: '',
            activeSelectItem: this.dropdownValues[0],
            data: [{
                property: '',
                value: '',
            }],
        };
    }

    private usersRows = [
        { key: 'uid', alignRight: false, label: 'UID' },
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'role', alignRight: false, label: 'Role' },
        { key: 'name', alignRight: false, label: 'Name'},
        { key: 'country', alignRight: false, label: 'Country' },
        { key: 'level', alignRight: true, label: 'Level' },
        { key: 'created_at', alignRight: true, label: 'Created' },
        { key: 'state', alignRight: true, label: 'State'},
    ];

    private dropdownValues = [
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

    public componentDidMount() {
        if (this.props.location.hash) {
            this.props.getUsers({ page: this.state.page + 1, limit: tablePageLimit(), extended: true });
        }
        if (!this.props.users.length) {
            this.props.getUsers({
                limit: this.state.rowsPerPage,
                page: this.state.page + 1,
                extended: true,
            });
        }
    }

    public render() {
        const { total, users, location } = this.props;
        const {
            page,
            rowsPerPage,
        } = this.state;

        return (
            <React.Fragment>
                <SearchBarContainer
                    selectedItems={this.dropdownValues}
                    handleSearchRequest={this.handleSearch}
                    handleClearSearchRequest={this.handleClearSearchRequest}
                />
                <UsersTable
                    dataLength={total}
                    rows={this.usersRows}
                    data={users}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    label={'User Directory'}
                    location={location}
                />
            </React.Fragment>
        );
    }

    private handleChangePage = (page: number) => {
        const { rowsPerPage } = this.state;
        this.setState({ page });
        this.handleGetUsers(rowsPerPage, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({rowsPerPage: rows, page: 0});
        this.handleGetUsers(rows, 0);
    }

    private handleGetUsers = (limit: number, page: number) => {
        const data = this.state.data ? convertToObj(this.state.data) : '';
        this.props.getUsers({ page: page + 1, limit, ...data, extended: true });
    }

    private handleSearch = (data: SearchBarRequestInterface[]) => {
        this.setState({ data: data });
        const obj = convertToObj(data);
        this.props.getUsers({ page: 1, limit: tablePageLimit(), ...obj, extended: true });
    }

    private handleClearSearchRequest = () => {
        this.setState({
            data: [{
                property: '',
                value: '',
            }],
            page: 0,
        });
        this.props.getUsers({ page: this.state.page + 1, limit: tablePageLimit() });
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        users: selectUsers(state),
        total: selectUsersTotal(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getUsers: payload => dispatch(getUsers(payload)),
    getDataByFilter: payload => dispatch(getDataByFilter(payload)),
    getUsersByLabel: payload => dispatch(getUsersByLabel(payload)),
});

// tslint:disable-next-line:no-any
export const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardUserTable as any));
