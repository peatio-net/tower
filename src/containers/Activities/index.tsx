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
import { InfoTable } from '../../components';
import { convertToObj } from '../../helpers';
import {
    AppState,
    getUserActivity,
    selectTotalNumber,
    selectUserActivity,
    selectUserActivityCurrentPage,
    selectUserActivityLoading,
    UserActivityDataInterface,
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
    userActivity: UserActivityDataInterface[];
}

interface OwnProps {
    location?: {
        pathname: string;
    };
}

interface DispatchProps {
    getUserActivity: typeof getUserActivity;
}

interface State {
    currentPage: number;
    currentLimit: number;
    activeSelectItem: {
        value: string;
        label: string;
    };
    searchValue: string;
    data: SearchBarRequestInterface[];
}

type Props = StyleProps & ReduxProps & DispatchProps & OwnProps;

class ActivitiesScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentPage: 0,
            currentLimit: tablePageLimit(),
            activeSelectItem: this.selectedValues[0],
            searchValue: '',
            data: [{
                property: '',
                value: '',
            }],
        };
    }

    private activityRows = [
        { key: 'created_at', alignRight: false, label: 'Date' },
        { key: 'user_email', alignRight: false, label: 'Email' },
        { key: 'user_role', alignRight: false, label: 'Role' },
        { key: 'topic', alignRight: true, label: 'Topic' },
        { key: 'action', alignRight: false, label: 'Action' },
        { key: 'result', alignRight: false, label: 'Result' },
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
    ];


    public componentDidMount() {
        const {
            currentLimit,
            currentPage,
        } = this.state;
        this.props.getUserActivity({ page: currentPage + 1, limit: currentLimit });
    }

    public render() {
        const {
            userActivity,
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
                    {userActivity[0] && this.renderContent()}
                    {!userActivity.length && !loading && <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </React.Fragment>
        );
    }

    public renderContent = () => {
        const {
            userActivity,
            total,
        } = this.props;

        const {
            currentLimit,
            currentPage,
        } = this.state;

        return (
            <React.Fragment>
                <InfoTable
                    dataLength={total}
                    rows={this.activityRows}
                    data={userActivity}
                    page={currentPage}
                    rowsPerPage={currentLimit}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    hidePagination={false}
                    label={'User Activities'}
                    location={this.props.location}
                />
            </React.Fragment>
        );
    }

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
        const data = this.state.data ? convertToObj(this.state.data) : '';
        this.props.getUserActivity({ page: page + 1, limit, ...data });
    }

    private handleSearch = (data: SearchBarRequestInterface[]) => {
        this.setState({ data: data });
        const obj = convertToObj(data);
        this.props.getUserActivity({ page: 1, limit: this.state.currentLimit, ...obj });
    }

    private handleClearSearchRequest = () => {
        this.setState({ data: [{
                property: '',
                value: '',
            }],
        });
        this.props.getUserActivity({ page: 1, limit: this.state.currentLimit });
    }
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    userActivity: selectUserActivity(state),
    loading: selectUserActivityLoading(state),
    total: selectTotalNumber(state),
    page: selectUserActivityCurrentPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUserActivity: params => dispatch(getUserActivity(params)),
    });

// tslint:disable-next-line:no-any
export const Activities = withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivitiesScreen as any)));
