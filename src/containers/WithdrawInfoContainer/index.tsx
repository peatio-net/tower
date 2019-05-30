import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { tablePageLimit } from '../../api/config';
import { WithdrawInfoComponent, WithdrawInfoTableComponent } from '../../components';
import {
    AppState,
    getWithdrawsInfo,
    getWithdrawUserHistory,
    selectWithdrawInfoData,
    selectWithdrawUserHistoryData,
    WithdrawInfoInterface,
    WithdrawListItemInterface,
} from '../../modules';

interface WithdrawInfoContainerState {
    rowsPerPage: number;
    page: number;
}

interface RouterProps {
    match: {
        params: {
            id: string;
        },
    };
}

interface ReduxProps {
    withdrawInfo?: WithdrawInfoInterface;
    withdrawUserHistory: WithdrawListItemInterface[];
}

interface DispatchProps {
    getWithdrawsInfo: typeof getWithdrawsInfo;
    getWithdrawUserHistory: typeof getWithdrawUserHistory;
}

type Props = RouterProps & ReduxProps & DispatchProps;

class WithdrawInfoContainer extends React.Component<Props, WithdrawInfoContainerState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: tablePageLimit(),
        };
    }

    private tableRows = [
        { key: 'date', alignRight: false, label: 'Date' },
        { key: 'amount', alignRight: false, label: 'Amount' },
        { key: 'currency', alignRight: false, label: 'Currency' },
        { key: 'status', alignRight: true, label: 'Status'},
    ];

    public componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getWithdrawsInfo(this.props.match.params.id);
            this.props.getWithdrawUserHistory({uid: this.props.match.params.id});
        }
    }

    public render() {
        const { page, rowsPerPage } = this.state;
        const { withdrawInfo, withdrawUserHistory } = this.props;

        return (
            <React.Fragment>
                <WithdrawInfoComponent
                    accountNumber={withdrawInfo ? withdrawInfo.account_number : 0}
                    address={withdrawInfo ? withdrawInfo.address : ''}
                    amount={withdrawInfo ? withdrawInfo.amount : 0}
                    bankName={withdrawInfo ? withdrawInfo.bank_name : ''}
                    bankAddress={withdrawInfo ? withdrawInfo.bank_address : ''}
                    bankCountry={withdrawInfo ? withdrawInfo.bank_country : ''}
                    bankSwiftCode={withdrawInfo ? withdrawInfo.bank_swift_code : 0}
                    country={withdrawInfo ? withdrawInfo.country.toUpperCase() : ''}
                    currency={withdrawInfo ? withdrawInfo.currency.toUpperCase() : ''}
                    date={withdrawInfo ? withdrawInfo.date : ''}
                    intermediaryBankName={withdrawInfo ? withdrawInfo.intermediary_bank_name : ''}
                    intermediaryBankAddress={withdrawInfo ? withdrawInfo.intermediary_bank_address : ''}
                    intermediaryBankCountry={withdrawInfo ? withdrawInfo.intermediary_bank_country : ''}
                    intermediaryBankSwiftCode={withdrawInfo ? withdrawInfo.intermediary_bank_swift_code : 0}
                    name={withdrawInfo ? withdrawInfo.name : ''}
                    rid={withdrawInfo ? withdrawInfo.rid : 0}
                    state={withdrawInfo ? withdrawInfo.state : ''}
                    uid={withdrawInfo ? withdrawInfo.uid : ''}
                    email={withdrawInfo ? withdrawInfo.email : ''}
                    handleRejectWithdraw={this.handleRejectWithdraw}
                    handleAcceptWithdraw={this.handleAcceptWithdraw}
                />
                <WithdrawInfoTableComponent
                    dataLength={withdrawUserHistory.length}
                    rows={this.tableRows}
                    data={withdrawUserHistory}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    hidePagination={false}
                    tableTitle={'Withdrawal History'}
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

    private handleRejectWithdraw = () => {
        window.console.log('Reject Withdraw');
    }

    private handleAcceptWithdraw = () => {
        window.console.log('Accept Withdraw');
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> = (state: AppState): ReduxProps => ({
    withdrawInfo: selectWithdrawInfoData(state),
    withdrawUserHistory: selectWithdrawUserHistoryData(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getWithdrawsInfo: payload => dispatch(getWithdrawsInfo(payload)),
    getWithdrawUserHistory: payload => dispatch(getWithdrawUserHistory(payload)),
});

export const WithdrawInfo = connect(mapStateToProps, mapDispatchToProps)(WithdrawInfoContainer);
