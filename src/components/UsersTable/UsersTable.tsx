import {
    createStyles,
    Paper,
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
    localeDate,
} from '../../helpers';

interface InfoTableProps {
    dataLength: number;
    rows: Array<{ key: string; alignRight: boolean; label: string; }>;
    // tslint:disable-next-line:no-any
    data: any;
    page: number;
    rowsPerPage: number;
    handleChangePage: (page: number) => void;
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
    label: {
        letterSpacing: '0.15px',
        padding: '25px',
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
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = StyleProps & InfoTableProps;

class TableComponent extends React.Component<Props> {

    public render() {
        const {
            classes,
            data,
            label,
        } = this.props;
        return (
            <div className={classes.root}>
                <Paper style={{ marginBottom: 25 }}>
                    <Typography variant="h5" gutterBottom={true} className={classes.label}>
                        {label}
                    </Typography>
                    {data.length ? this.renderContent() : <Typography variant="caption" align="center" className={classes.emptyTable}>There is no data to show</Typography>}
                </Paper>
            </div>
        );
    }

    private renderContent = () => {
        const {
            classes,
            rows,
            data,
            page,
            hidePagination,
            dataLength,
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
                                                    <TableCell key={index} component="td" align={row.alignRight ? 'right' : 'left'}>
                                                        <Typography variant="caption" gutterBottom={true} className={classes.content}>
                                                            {row.key === 'email' ? (<Link to={`${location && location.pathname}/${n.uid}`} className={classes.link}>{n.email}</Link>)
                                                                : row.key === 'created_at' || row.key === 'validated_at' || row.key === 'updated_at' ? localeDate(n[row.key], 'shortDate')
                                                                : row.key === 'state' ? this.getColored(n[row.key])
                                                                : row.key === 'name' ? n.profile && `${n.profile.first_name} ${n.profile.last_name}`
                                                                : row.key === 'country' ? n.profile && n.profile.country
                                                                : n[row.key]}
                                                            </Typography>
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
                        page={page}
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
        this.props.handleChangePage(page);
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
                        <TableCell
                            key={row.key}
                            align={row.alignRight ? 'right' : 'left'}
                        >
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
        return state === 'active' ?
            <span className={classes.active}>{state}</span>
            : <span className={classes.banned}>{state}</span>;
    };
}

export const UsersTable = withStyles(styles, { withTheme: true })(TableComponent);
