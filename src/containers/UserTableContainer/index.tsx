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
    InfoTable,
    SearchHeader,
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
    };
}

type Props = ReduxProps & DispatchProps & RouterProps;

// tslint:disable
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
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'otp', alignRight: true, label: 'Authorization method' },
        { key: 'level', alignRight: true, label: 'Level' },
        { key: 'role', alignRight: true, label: 'Role' },
        { key: 'uid', alignRight: true, label: 'UID' },
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
        console.log(this.props.location);
        if (this.props.location.hash) {
            this.getRequestFromRouterProps(this.props.location.hash);
        }
        if (!this.props.users.length) {
            this.props.getUsers({
                limit: this.state.rowsPerPage,
                page: this.state.page + 1,
            });
        }
    }

    public render() {
        const { users, total } = this.props;
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
                <InfoTable
                    dataLength={total}
                    rows={this.usersRows}
                    data={users}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
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
        const { searchValue, searchPoint } = this.state;
        this.setState({ page });
        switch (searchPoint.value) {
            case 'all':
                this.props.getUsers({ limit: tablePageLimit(), page: page + 1});
                break;
            case 'documents':
                this.props.getUsersByLabel({
                    key: 'document',
                    value: searchValue.toLowerCase(),
                    limit: tablePageLimit(),
                    page: page + 1,
                });
                break;
            default:
                const requestObject = {
                    field: searchPoint.value,
                    value: searchValue.toLowerCase(),
                    page: page + 1,
                    limit: tablePageLimit(),
                };
                this.props.getDataByFilter(requestObject);
        }
    };

    // tslint:disable-next-line:no-any
    private handleSearch = (e?: any) => {
        if (e) {
            e.preventDefault();
        }
        const { searchValue, searchPoint } = this.state;
        switch (searchPoint.value) {
            case 'all':
                this.props.getUsers({ limit: tablePageLimit(), page: 1});
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
                this.props.getUsers({ limit: tablePageLimit(), page: 1});
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
