import {
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
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    getUserBrowser,
    getUserOS,
    localeDate,
} from '../../helpers';

interface ActivityTableProps {
    dataLength: number;
    rows: Array<{ key: string; alignRight: boolean; label: string; }>;
    // tslint:disable-next-line:no-any
    data: any;
    page?: number;
    rowsPerPage: number;
    handleChangePage?: (page: number) => void;
    handleChangeRowsPerPage?: (rows: number) => void;
    hidePagination?: boolean;
    label?: string;
    location?: {
        pathname: string;
    };
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    link: {
        cursor: 'pointer',
        color: '#309CEA',
        textDecoration: 'none',
        letterSpacing: '0.4px',
    },
    attachment: {
        color: 'rgba(0, 0, 0, 0.87)',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    label: {
        letterSpacing: '0.15px',
        padding: '16px',
        paddingBottom: '0px',
        fontWeight: 600,
    },
    headers: {
        fontWeight: 600,
        fontSize: '14px',
        letterpacing: '0.1px',
    },
    content: {
        fontWeight: 500,
        letterSpacing: '0.4px',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    emptyTable: {
        padding: theme.spacing.unit,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    selectIcon: {
        paddingLeft: '10px',
    },
    active: {
        color: '#00A41A',
    },
    banned: {
        color: '#E23328',
    },
    greyIcon: {
        cursor: 'pointer',
        color: '#979797',
    },
    cell: {
        padding: '4px 0px',
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = StyleProps & ActivityTableProps;

class TableComponent extends React.Component<Props> {

    public render() {
        const {
            classes,
            data,
            label,
        } = this.props;
        return (
            <div className={classes.root}>
                    {label && (<Typography variant="h6" gutterBottom={true} className={classes.label}>{label}</Typography>)}
                    {data.length ? this.renderContent() : <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
            </div>
        );
    }

    private renderContent = () => {
        const {
            classes,
            page,
            hidePagination,
            dataLength,
            data,
            rows,
            location,
        } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        {this.getHeaderForTable()}
                        <TableBody>
                            { // tslint:disable:no-any
                                data.map((n: any, i: number) => {
                                    return (
                                        <TableRow key={i}>
                                            {rows.map((row: any, index: number) => {
                                                return (
                                                    <TableCell key={index} component="td" align={row.alignRight ? 'right' : 'left'} >
                                                        { row.key === 'admin_email' ? (<Link to={`${location && location.pathname}/${n.admin && n.admin.uid}`} className={classes.link}>{n.admin && n.admin.email}</Link>)
                                                            : row.key === 'created_at' ? localeDate(n[row.key], 'fullDate')
                                                            : row.key === 'browser' ? getUserBrowser(n.user_agent)
                                                            : row.key === 'os' ? getUserOS(n.user_agent)
                                                            : row.key === 'result' ? this.getColored(n.result)
                                                            : row.key === 'admin_role' ? n.admin && n.admin.role
                                                            : row.key === 'target' ? (<Link to={`${location && location.pathname}/${n.target && n.target.uid}`} className={classes.link}>{n.target && n.target.email}</Link>)
                                                            : n[row.key]}
                                                    </TableCell>
                                                );})
                                            }
                                        </TableRow>
                                    );
                                }) // tslint:enable:no-any
                            }
                        </TableBody>
                    </Table>
                </div>
                {!hidePagination ? (
                    <TablePagination
                        component="div"
                        count={Number(dataLength)}
                        rowsPerPage={this.props.rowsPerPage}
                        page={page || 0}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        classes={{ selectIcon: classes.selectIcon }}
                    />
                ) : null}
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChangePage = (event: any, page: number) => {
        this.props.handleChangePage && this.props.handleChangePage(page);
    };

    private handleChangeRowsPerPage = event => {
        this.props.handleChangeRowsPerPage && this.props.handleChangeRowsPerPage(event.target.value);
    };

    private getHeaderForTable = () => {
        const { classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: {key: string, alignRight: boolean, label: string}) => (
                        <TableCell key={row.key} align={row.alignRight ? 'right' : 'left'}>
                            <Typography variant="subtitle2" gutterBottom={true} className={classes.headers}>
                                {row.label}
                            </Typography>
                        </TableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    };

    private getColored = (state: string) => {
        const { classes } = this.props;
        return state === 'active' || state === 'succeed' ?
            <span className={classes.active}>{state}</span>
            : <span className={classes.banned}>{state}</span>;
    };
}

export const AdminActivityTable = withStyles(styles, { withTheme: true })(TableComponent);
