import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { SearchBarContainer, SearchBarRequestInterface } from '../';
import { tablePageLimit } from '../../api/config';
import { WithdrawInfoTableComponent } from '../../components';
import {
    AppState,
    getWithdrawsList,
    selectWithdrawListData,
    WithdrawListItemInterface,
} from '../../modules';

interface WithdrawListTableContainerState {
    rowsPerPage: number;
    page: number;
    activeSelectItem: {
        value: string;
        label: string;
    };
    searchValue: string;
}

interface ReduxProps {
    withdrawList: WithdrawListItemInterface[];
}

interface DispatchProps {
    getWithdrawsList: typeof getWithdrawsList;
}

export type WithdrawListTableContainerProps = DispatchProps & ReduxProps;

class WithdrawListTableContainer extends React.Component<WithdrawListTableContainerProps, WithdrawListTableContainerState> {
    constructor(props: WithdrawListTableContainerProps) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
            activeSelectItem: this.selectedValues[0],
            searchValue: '',
        };
    }

    private tableRows = [
        { key: 'uid', alignRight: false, label: 'UID' },
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'date', alignRight: false, label: 'Date' },
        { key: 'amount', alignRight: false, label: 'Amount' },
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'status', alignRight: true, label: 'Status'},
    ];

    private selectedValues = [
        {
            value: 'email',
            label: 'Email',
            checked: false,
        },
        {
            value: 'uid',
            label: 'UID',
            checked: false,
        },
        {
            value: 'date',
            label: 'Date',
            checked: false,
        },
        {
            value: 'amount',
            label: 'Amount',
            checked: false,
        },
        {
            value: 'currency',
            label: 'Currency',
            checked: false,
        },
        {
            value: 'status',
            label: 'Status',
            checked: false,
        },
    ];

    public componentDidMount() {
        this.props.getWithdrawsList();
    }

    public render() {
        const {
            page,
            rowsPerPage,
        } = this.state;

        return (
            <React.Fragment>
                <SearchBarContainer
                    selectedItems={this.selectedValues}
                    handleSearchRequest={this.handleSearch}
                    handleClearSearchRequest={this.handleClearSearchRequest}
                />
                <WithdrawInfoTableComponent
                    dataLength={this.props.withdrawList.length}
                    rows={this.tableRows}
                    data={this.props.withdrawList.length ? this.props.withdrawList : []}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    hidePagination={false}
                    tableTitle={'Withdrawal requests'}
                />
            </React.Fragment>
        );
    }

    private handleChangePage = (page: number) => {
        this.setState({
            page,
        });
    };

    private handleChangeRowsPerPage = (count: string) => {
        this.setState({
            page: 0,
            rowsPerPage: Number(count),
        });
    };

    private handleSearch = (data: SearchBarRequestInterface[]) => {
        window.console.log(data);
    }

    private handleClearSearchRequest = () => {
        this.props.getWithdrawsList();
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    withdrawList: selectWithdrawListData(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getWithdrawsList: () => dispatch(getWithdrawsList()),
});

export const WithdrawList = connect(mapStateToProps, mapDispatchToProps)(WithdrawListTableContainer);
