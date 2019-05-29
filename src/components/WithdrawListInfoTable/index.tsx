// tslint:disable:jsx-no-lambda
import {
    Card,
    CardContent,
    createStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithdrawListItemInterface } from '../../modules';

interface RowItemInterface {
    key: string;
    alignRight: boolean;
    label: string;
}

interface WithdrawListInfoTableProps {
    dataLength: number;
    rows: RowItemInterface[];
    data: WithdrawListItemInterface[];
    page: number;
    rowsPerPage: number;
    handleChangePage: (page: number) => void;
    handleChangeRowsPerPage: (count: string) => void;
    hidePagination?: boolean;
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        color: 'rgba(0, 0, 0, 0.87)',
        border: '',
    },
    card: {
        padding: '16px 0',
    },
    table: {
        minWidth: 1020,
    },
    tableTitle: {
        flex: '0 0 auto',
        color: '#rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '20px',
        paddingLeft: '24px',
    },
    tableWrapper: {
        overflowX: 'auto',
        padding: '0 !important',
    },
    headerItem: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '24px',
        padding: 0,
        paddingLeft: '24px',
    },
    email: {
        cursor: 'pointer',
        color: '#309CEA',
        fontSize: '12px',
        lineHeight: '16px',
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '12px',
        lineHeight: '16px',
    },
    tableItem: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '12px',
      lineHeight: '16px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      letterSpacing: '0.4px',
    },
    tableItemStatus: {
      fontSize: '12px',
      lineHeight: '16px',
      fontStyle: 'normal',
      fontWeight: 'normal',
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
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = StyleProps & WithdrawListInfoTableProps;

class TableComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            page,
            hidePagination,
            dataLength,
        } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <CardContent className={classes.card}>
                        <div>
                            <Typography variant="h6" className={classes.tableTitle}>
                                Withdraw List
                            </Typography>
                        </div>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                                {this.getHeaderForTable()}
                                <TableBody>
                                    {this.getTableBody()}
                                </TableBody>
                            </Table>
                        </div>
                        {!hidePagination ? (
                            <TablePagination
                                component="div"
                                count={Number(dataLength)}
                                rowsPerPage={this.props.rowsPerPage}
                                onChangeRowsPerPage={e => this.handleChangeRowsPerPage(e.target.value)}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                            />
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        );
    }

    private getTableBody = () => {
        const {
            classes,
            data,
            rows,
            page,
            rowsPerPage,
        } = this.props;

        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n: WithdrawListItemInterface, i: number) => {
            return (
                <TableRow key={i}>
                    {rows.map((row: RowItemInterface, index: number) => {
                        return (
                            <TableCell key={index} component="td" align={row.alignRight ? 'right' : 'left'}>
                                {row.key === 'email' ? (<span className={classes.email}>{n.email}</span>)
                                    : row.key === 'uid' ? (<Link to={`/tower/withdraws/${n.uid}`} className={classes.link}>{n.uid}</Link>)
                                    : row.key === 'status' ? this.getStatusItem(n.status)
                                    : row.key === 'date' || row.key === 'amount' || row.key === 'currency' ? (<span className={classes.tableItem}>{n[row.key]}</span>) : n[row.key]}
                            </TableCell>
                        );})
                    }
                </TableRow>
            );
        });
    };

    private getStatusItem = (value: string) => {
        const { classes } = this.props;
        const cx = classnames(classes.tableItemStatus, {
            [classes.red]: value.toLowerCase() === 'canceled',
            [classes.yellow]: value.toLowerCase() === 'pending',
            [classes.green]: value.toLowerCase() === 'agreed',
        });

        return <span className={cx}>{value}</span>;
    }

    private getHeaderForTable = () => {
        const { classes, rows } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map((row: {key: string, alignRight: boolean, label: string}) => (
                        <TableCell
                            key={row.key}
                            align={row.alignRight ? 'right' : 'left'}
                            className={classes.headerItem}
                        >
                            {row.label}
                        </TableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    };

    private handleChangeRowsPerPage = (value: string) => {
        this.props.handleChangeRowsPerPage(value);
    };

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.props.handleChangePage(page);
    };
}

export const WithdrawListInfoTable = withStyles(styles, { withTheme: true })(TableComponent);
