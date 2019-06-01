import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    tablePageLimit,
} from '../../api/config';
import {
    DataItemInterface,
    SearchHeader,
    UsersTable,
} from '../../components';
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
    searchPoint: DataItemInterface;
    searchValue: string;
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
            searchPoint: this.dropdownValues[0],
            searchValue: '',
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
            label: 'All Users',
            value: 'all',
        },
        {
            label: 'Email',
            value: 'email',
        },
        {
            label: 'Authorization method',
            value: 'otp',
        },
        {
            label: 'Level',
            value: 'level',
        },
        {
            label: 'Role',
            value: 'role',
        },
        {
            label: 'UID',
            value: 'uid',
        },
        {
            label: 'State',
            value: 'state',
        },
        {
            label: 'Documents',
            value: 'documents',
        },
    ];

    public componentDidMount() {
        if (this.props.location.hash) {
            this.getRequestFromRouterProps(this.props.location.hash);
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
            searchPoint,
            searchValue,
        } = this.state;

        return (
            <React.Fragment>
                <SearchHeader
                    data={this.dropdownValues}
                    searchValue={searchValue}
                    handleChangeSearchValue={this.handleChangeSearchValue}
                    searchPoint={searchPoint}
                    handleChangeSearchPoint={this.handleChangeSearchPoint}
                    handleSearch={this.handleSearch}
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

    private handleChangeSearchPoint = (value: string) => {
        const item = this.dropdownValues.find(elem => elem.value === value);
        if (item) {
            this.setState({
                searchPoint: item,
                searchValue: '',
            });
        }
    };

    private handleChangeSearchValue = (value: string) => {
        this.setState({
            searchValue: value,
        });
    };

    private handleChangePage = (page: number) => {
        const { searchValue, searchPoint, rowsPerPage } = this.state;
        this.setState({ page });
        switch (searchPoint.value) {
            case 'all':
                this.props.getUsers({ limit: rowsPerPage, page: page + 1, extended: true });
                break;
            case 'documents':
                this.props.getUsersByLabel({
                    key: 'document',
                    value: searchValue.toLowerCase(),
                    limit: rowsPerPage,
                    page: page + 1,
                });
                break;
            default:
                const requestObject = {
                    field: searchPoint.value,
                    value: searchValue.toLowerCase(),
                    page: page + 1,
                    limit: rowsPerPage,
                    extended: true,
                };
                this.props.getDataByFilter(requestObject);
        }
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({rowsPerPage: rows, page: 1});
        this.props.getUsers({limit: rows, page: 1, extended: true});
    }

    // tslint:disable-next-line:no-any
    private handleSearch = (e?: any) => {
        if (e) {
            e.preventDefault();
        }
        const { searchValue, searchPoint } = this.state;
        switch (searchPoint.value) {
            case 'all':
                this.props.getUsers({ limit: tablePageLimit(), page: 1, extended: true});
                this.props.history.push('#all');
                break;
            case 'documents':
                this.props.getUsersByLabel({
                    key: 'document',
                    value: searchValue.toLowerCase(),
                    limit: tablePageLimit(),
                    page: 1,
                });

                let hash = `#${searchPoint.value}=${searchValue.toLowerCase()}`;
                this.props.history.push(hash);
                break;
            default:
                const requestObject = {
                    field: searchPoint.value,
                    value: searchValue.toLowerCase(),
                    page: 1,
                    limit: tablePageLimit(),
                };
                this.props.getDataByFilter(requestObject);
                hash = `#${searchPoint.value}=${searchValue.toLowerCase()}`;
                this.props.history.push(hash);
        }

        this.setState({
            page: 0,
        });
    };

    private getRequestFromRouterProps = (search: string) => {
        const props = search.split('#')[1].split('=');
        const key = props[0];
        const value = props[1];

        switch (key) {
            case 'all':
                this.props.getUsers({ limit: tablePageLimit(), page: 1, extended: true });
                break;
            case 'documents':
                this.props.getUsersByLabel({
                    key: 'document',
                    value: value.toLowerCase(),
                    limit: tablePageLimit(),
                    page: 1,
                });
                break;
            default:
                const requestObject = {
                    field: key.toLowerCase(),
                    value: value.toLowerCase(),
                    page: 1,
                    limit: tablePageLimit(),
                };
                this.props.getDataByFilter(requestObject);
        }
        this.handleChangeSearchPoint(key);
        this.handleChangeSearchValue(value);
    };
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
