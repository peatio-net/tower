import {
    createStyles,
    Paper,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchBarContainer, SearchBarRequestInterface } from '../';
import { tablePageLimit } from '../../api/config';
import { AdminActivityTable } from '../../components';
import { convertToObj } from '../../helpers';
import {
    AdminActivityDataInterface,
    AppState, getAdminActivity,
    selectAdminActivity,
    selectAdminActivityCurrentPage,
    selectAdminActivityLoading,
    selectAdminActivityTotalNumber,
} from '../../modules';

const styles = (theme: Theme) => (createStyles({
    emptyTable: {
        padding: theme.spacing.unit,
    },
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableRow: {
        '&:hover': {
            backgroundColor: '#f9f9f9',
        },
    },
    title: {
        padding: theme.spacing.unit * 2.5,
        paddingBottom: 0,
        fontWeight: 600,
        letterpacing: '0.1px',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface ReduxProps {
    loading: boolean;
    total: number;
    page: number;
    adminActivity: AdminActivityDataInterface[];
}

interface DispatchProps {
    getAdminActivity: typeof getAdminActivity;
}

interface OwnProps {
    location?: {
        pathname: string;
    };
}

interface State {
    currentPage: number;
    currentLimit: number;
    searchValue: string;
    activeSelectItem: {
        value: string;
        label: string;
    };
    data: SearchBarRequestInterface[];
}

type Props = StyleProps & ReduxProps & DispatchProps & OwnProps;

class AdminActivitiesScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentPage: 0,
            currentLimit: tablePageLimit(),
            searchValue: '',
            activeSelectItem: this.selectedValues[0],
            data: [],
        };
    }

    private activityRows = [
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'admin_email', alignRight: false, label: 'Email' },
        { key: 'admin_role', alignRight: false, label: 'Role' },
        { key: 'topic', alignRight: false, label: 'Topic' },
        { key: 'action', alignRight: false, label: 'Action' },
        { key: 'result', alignRight: false, label: 'Result' },
        { key: 'target', alignRight: true, label: 'Target' },
        { key: 'user_ip', alignRight: true, label: 'IP' },
        { key: 'browser', alignRight: true, label: 'Browser' },
        { key: 'os', alignRight: true, label: 'OS' },
    ];

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
            label: 'Action',
            value: 'action',
            checked: false,
        },
        {
            label: 'Topic',
            value: 'topic',
            checked: false,
        },
        {
            label: 'Target UID',
            value: 'target_uid',
            checked: false,
        },
    ];

    public componentDidMount() {
        const {
            currentLimit,
            currentPage,
        } = this.state;
        this.props.getAdminActivity({ page: currentPage + 1, limit: currentLimit });
    }

    public render() {
        const {
            adminActivity,
            loading,
            classes,
        } = this.props;
        return (
            <React.Fragment>
                <SearchBarContainer
                    selectedItems={this.selectedValues}
                    handleSearchRequest={this.handleSearch}
                    handleClearSearchRequest={this.handleClearSearchRequest}
                />
                <Paper style={{ marginTop: 25 }}>
                    <Typography variant="h6" gutterBottom={true} className={classes.title}>
                        Admin Activities
                    </Typography>
                    {adminActivity[0] && this.renderContent()}
                    {!adminActivity.length && !loading && <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </React.Fragment>
        );
    }

    public renderContent = () => {
        const {
            adminActivity,
            total,
            location,
        } = this.props;

        const {
            currentLimit,
            currentPage,
        } = this.state;

        return (
            <AdminActivityTable
                dataLength={total}
                rows={this.activityRows}
                data={adminActivity}
                page={currentPage}
                rowsPerPage={currentLimit}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                hidePagination={false}
                location={location}
            />
        );
    };

    private handleSearch = (data: SearchBarRequestInterface[]) => {
        this.setState({ data });
        this.props.getAdminActivity({ page: 1, limit: this.state.currentLimit, ...convertToObj(data) });
    };

    private handleClearSearchRequest = () => {
        this.setState({ data: [], currentPage: 0 });
        this.props.getAdminActivity({ page: this.state.currentPage + 1, limit: this.state.currentLimit });
    };

    private handleChangePage = (page: number) => {
        this.setState({ currentPage: page });
        this.handleGetUserActivity(this.state.currentLimit, page);
    };

    private handleChangeRowsPerPage = (rows: number) => {
        this.setState({
            currentLimit: rows,
            currentPage: 0,
        });
        this.handleGetUserActivity(rows, 0);
    };

    private handleGetUserActivity = (limit: number, page: number) => {
        const { data } = this.state;
        this.props.getAdminActivity({ limit, page: page + 1, ...convertToObj(data) });
    };
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    adminActivity: selectAdminActivity(state),
    loading: selectAdminActivityLoading(state),
    total: selectAdminActivityTotalNumber(state),
    page: selectAdminActivityCurrentPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getAdminActivity: params => dispatch(getAdminActivity(params)),
});

// tslint:disable-next-line:no-any
export const AdminActivities = withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminActivitiesScreen as any)));
