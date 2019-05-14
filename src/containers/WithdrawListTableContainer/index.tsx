import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { tablePageLimit } from '../../api/config';
import { WithdrawListInfoTable } from '../../components';
import {
    AppState,
    getWithdrawsList,
    selectWithdrawListData,
    WithdrawListItemInterface,
} from '../../modules';

interface WithdrawListTableContainerState {
    rowsPerPage: number;
    page: number;
}

interface ReduxProps {
    withdrawList: WithdrawListItemInterface[];
}

interface DispatchProps {
    getWithdrawsList: typeof getWithdrawsList;
}

export type WithdrawListTableContainerProps = DispatchProps & ReduxProps;

const data = [
    {
        uid: 'WID4567890AD',
        email: 'admin@admin.fr',
        date: '18-06-20 17:38:42',
        amount: '2000',
        currency: 'USD',
        status: 'Pending',
    },
    {
        uid: '1234567890AD',
        email: 'admin@st.net',
        date: '18-06-20 17:38:42',
        amount: '2000',
        currency: 'USD',
        status: 'Canceled',
    },
    {
        uid: '1234567890AD',
        email: 'admin@admin.fr',
        date: '18-06-20 17:38:42',
        amount: '2000',
        currency: 'USD',
        status: 'Agreed',
    },
];

class WithdrawListTableContainer extends React.Component<WithdrawListTableContainerProps, WithdrawListTableContainerState> {
    constructor(props: WithdrawListTableContainerProps) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
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
                <WithdrawListInfoTable
                    dataLength={this.props.withdrawList.length}
                    rows={this.tableRows}
                    data={this.props.withdrawList.length ? this.props.withdrawList : data}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    hidePagination={false}
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
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    withdrawList: selectWithdrawListData(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getWithdrawsList: () => dispatch(getWithdrawsList()),
});

export const WithdrawList = connect(mapStateToProps, mapDispatchToProps)(WithdrawListTableContainer);
