import {
    Button,
    Card,
    CardContent,
    createStyles,
    Divider,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    Clear,
    Done,
} from '@material-ui/icons';
import classnames from 'classnames';
import * as React from 'react';

const styles = (theme: Theme) => (createStyles({
    withdrawInfo: {
        display: 'block',
        width: '100%',
        padding: '0 24px 0 0 !important',
    },
    withdrawInfoBody: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px',
    },
    withdrawInfoBlock: {
        display: 'inline-block',
        maxWidth: '100%',
        width: '100%',
        marginBottom: '24px',
    },
    withdrawInfoBlockBody: {
        display: 'inline-block',
        width: '100%',
        paddingLeft: '24px',
    },
    emailTitle: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '20px',
        paddingLeft: '24px',
        paddingTop: '20px',
    },
    block: {
        display: 'inline-block',
        maxWidth: '100%',
        width: '100%',
    },
    blockItem: {
        display: 'inline-block',
        maxWidth: '50%',
        width: '100%',
    },
    blockItemTitle: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        paddingBottom: '8px',
        opacity: 0.54,
        letterSpacing: '0.4px',
    },
    blockItemInfo: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        letterSpacing: '0.4px',
    },
    withdrawInfoBlockBodyItem: {
        padding: '12px 0',
    },
    blockButtons: {
        textAlign: 'right',
        width: '100%',
    },
    buttonReject: {
        background: '#E23328',
        color: '#fff',
        margin: theme.spacing.unit,
        fontWeight: 500,
        fontSize: '14px',
    },
    buttonAccept: {
        background: '#309CEA',
        color: '#fff',
        margin: theme.spacing.unit,
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '0.75px',
    },
    red: {
        color: '#E23328',
    },
    green: {
        color: '#00A41A',
    },
    yellow: {
        color: '#E3B930',
    },
    divider: {
        margin: '12px 0',
    },
    buttonIcon: {
        paddingLeft: '4px',
        marginRight: '-10px',
    },
}));

interface OwnProps {
    accountNumber: number;
    address: string;
    amount: number;
    bankName: string;
    bankAddress: string;
    bankCountry: string;
    bankSwiftCode: number;
    country: string;
    currency: string;
    date: string;
    email: string;
    handleRejectWithdraw: () => void;
    handleAcceptWithdraw: () => void;
    intermediaryBankName: string;
    intermediaryBankAddress: string;
    intermediaryBankCountry: string;
    intermediaryBankSwiftCode: number;
    name: string;
    rid: number;
    state: string;
    uid: string;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type WithdrawInfoComponentProps = StyleProps & OwnProps;

class WithdrawInfo extends React.Component<WithdrawInfoComponentProps> {
    public render() {
        const {
            accountNumber,
            address,
            amount,
            bankName,
            bankAddress,
            bankCountry,
            bankSwiftCode,
            classes,
            country,
            currency,
            date,
            email,
            intermediaryBankName,
            intermediaryBankAddress,
            intermediaryBankCountry,
            intermediaryBankSwiftCode,
            name,
            rid,
            state,
            uid,
        } = this.props;
        return (
            <Card>
                <CardContent className={classes.withdrawInfo}>
                    <div className={classes.withdrawInfoBlock}>
                        <Typography variant="h6" className={classes.emailTitle}>
                            {email}
                        </Typography>
                    </div>
                    <div className={classes.withdrawInfoBlockBody}>
                        <div className={classes.block}>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        State
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {this.getStateItem(state)}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Full name
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {name}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Date
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {date}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Address
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {address}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        UID
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {uid}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Country
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {country}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Amount
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {amount}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Account number
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {accountNumber}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Currency
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {currency.toUpperCase()}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        RID
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {rid}
                                    </Typography>
                                </div>
                            </div>
                            <Divider variant="middle" className={classes.divider} />
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Bank name
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {bankName}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Intermediary bank name
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {intermediaryBankName}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Bank address
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {bankAddress}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Intermediary bank address
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {intermediaryBankAddress}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Bank country
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {bankCountry}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Intermediary Bank Country
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {intermediaryBankCountry}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Bank swift code
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {bankSwiftCode}
                                    </Typography>
                                </div>
                                <div className={classes.blockItem}>
                                    <Typography className={classes.blockItemTitle} variant="h5" component="h5">
                                        Intermediary bank swift code
                                    </Typography>
                                    <Typography className={classes.blockItemInfo} component="p">
                                        {intermediaryBankSwiftCode}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.withdrawInfoBlockBodyItem}>
                                <div className={classes.blockButtons}>
                                    <Button
                                        variant="contained"
                                        className={classes.buttonAccept}
                                        onClick={this.handleAcceptWithdraw}
                                    >
                                        Accept <Done className={classes.buttonIcon} />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className={classes.buttonReject}
                                        onClick={this.handleRejectWithdraw}
                                    >
                                        Reject <Clear className={classes.buttonIcon} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    private getStateItem = (value: string) => {
        const { classes } = this.props;
        const cx = classnames({
            [classes.red]: value.toLowerCase() === 'canceled',
            [classes.yellow]: value.toLowerCase() === 'pending',
            [classes.green]: value.toLowerCase() === 'agreed',
        });

        return <span className={cx}>{value}</span>;
    }

    private handleRejectWithdraw = () => this.props.handleRejectWithdraw();
    private handleAcceptWithdraw = () => this.props.handleAcceptWithdraw();
}

export const WithdrawInfoComponent = withStyles(styles, { withTheme: true })(WithdrawInfo);
