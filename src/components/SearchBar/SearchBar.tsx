import MomentUtils from '@date-io/moment';
import {
    Card,
    CardContent,
    createMuiTheme,
    createStyles,
    FormControl,
    MenuItem,
    MuiThemeProvider,
    Select,
    TextField,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import {
    AddCircleOutline,
    Close,
    RemoveCircleOutline,
    Search,
} from '@material-ui/icons';
import classNames from 'classnames';
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Moment} from 'moment';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    card: {
        borderRadius: 0,
        margin: '10px 0',
    },
    cardContent: {
        padding: '12px 0 12px 24px !important',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    formControl: {
        display: 'flex',
    },
    block: {
        display: 'inline-block',
    },
    select: {
        minWidth: 220,
        width: '220px',
        '&::before': {
            borderBottom: '1px solid #309CEA !important',
        },
    },
    icon: {
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
    textField: {
        minWidth: 220,
        width: '220px',
        margin: '0 24px',
    },
    icons: {
        borderLeft: '1.5px solid #e0e0e0',
    },
    sideIconSearch: {
        display: 'inline-block',
        padding: '5px 12px 2px 24px',
    },
    sideIconClear: {
        display: 'inline-block',
        padding: '5px 24px 2px 12px',
    },
    sideIconItem: {
        color: '#979797',
        cursor: 'pointer',
    },
    addMinusIconBlock: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 15,
    },
    addMinusIcon: {
        color: '#979797',
        cursor: 'pointer',
    },
    searchTerms: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'calc(100% - 141px)',
    },
    datePickerStart: {
        marginRight: '15px',
    },
    searchFields: {
        display: 'flex',
        alignItems: 'center',
    },
});

export interface SelectItem {
    value: string;
    label: string;
    checked: boolean;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface OwnProps {
    index: number;
    selectedValues: SelectItem[];
    activeItem: SelectItem;
    handleChangeSelect: (index: number, value: string) => void;
    searchValue: string;
    handleChangeSearchValue: (index: number, value: string) => void;
    handleAddItem?: () => void;
    handleDeleteItem?: (index: number) => void;
    handleClear?: () => void;
    handleSendRequest?: () => void;
    startDate?: Moment | null;
    endDate?: Moment | null;
    handleStartDateChange?: (date: Moment) => void;
    handleEndDateChange?: (date: Moment) => void;
    handleEnterPress: (event: React.KeyboardEvent<HTMLDivElement>)  => void;
}

type Props = OwnProps & StyleProps;

const datePickerTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#309CEA',
            },
        },
        typography: {
            useNextVariants: true,
        },
    },
);

class SearchBarComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            activeItem,
            selectedValues,
            searchValue,
            index,
            startDate,
            endDate,
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <FormControl className={classes.formControl} variant="outlined">
                        <div className={classes.container}>
                            <div className={classes.searchTerms}>
                                <div className={classes.formControl}>
                                    <div className={classes.searchFields}>
                                        <Select
                                            value={activeItem.value}
                                            onChange={e => this.handleChangeSelect(index, e.target.value)}
                                            className={classes.select}
                                            classes={{ icon: classes.icon }}
                                        >
                                            {selectedValues.map((el, i) => <MenuItem key={i} disabled={el.checked} value={el.value}>{el.label}</MenuItem>)}
                                        </Select>
                                        <TextField
                                            className={classes.textField}
                                            placeholder={`Enter ${activeItem.label}`}
                                            value={searchValue}
                                            onChange={this.handleChangeSearchValue}
                                            onKeyPress={this.handleEnterPress}
                                        />
                                    </div>
                                    <div className={classes.addMinusIconBlock}>
                                        {index === 0 ? (
                                            <AddCircleOutline
                                                onClick={this.props.handleAddItem}
                                                className={classes.addMinusIcon}
                                            />) : (
                                            <RemoveCircleOutline
                                                className={classes.addMinusIcon}
                                                onClick={this.handleDeleteItem}
                                            />)
                                        }
                                    </div>
                                </div>

                                <div>
                                    {index === 0 ? (
                                        <MuiThemeProvider theme={datePickerTheme}>
                                            <div>
                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                    <DatePicker
                                                        value={startDate}
                                                        onChange={this.handleStartDateChange}
                                                        placeholder="Start date"
                                                        className={classes.datePickerStart}
                                                        format="DD-MM-YYYY"
                                                        onKeyPress={this.handleEnterPress}
                                                    />
                                                </MuiPickersUtilsProvider>

                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                    <DatePicker
                                                        value={endDate}
                                                        onChange={this.handleEndDateChange}
                                                        placeholder="End date"
                                                        minDate={startDate || undefined}
                                                        format="DD-MM-YYYY"
                                                        onKeyPress={this.handleEnterPress}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </MuiThemeProvider>
                                    ) : null}
                                </div>
                            </div>
                            {index === 0 ? (
                                <div className={classNames(classes.block, classes.icons)}>
                                    <div className={classes.sideIconSearch}>
                                        <Search className={classes.sideIconItem} onClick={this.props.handleSendRequest}/>
                                    </div>
                                    <div className={classes.sideIconClear}>
                                        <Close className={classes.sideIconItem} onClick={this.props.handleClear}/>
                                    </div>
                                </div>) : null
                            }
                        </div>
                    </FormControl>
                </CardContent>
            </Card>
        );
    }

    private handleDeleteItem = e => {
        const { index } = this.props;

        if (this.props.handleDeleteItem) {
            this.props.handleDeleteItem(index);
        }
    };

    private handleChangeSelect = (index: number, value: string) => {
        this.props.handleChangeSelect(index, value);
    };

    private handleChangeSearchValue = e => {
        const { index } = this.props;

        this.props.handleChangeSearchValue(index, e.target.value);
    };

    private handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        this.props.handleEnterPress(event);
    };

    private handleStartDateChange = (date: Moment) => {
        this.props.handleStartDateChange && this.props.handleStartDateChange(date);
    };

    private handleEndDateChange = (date: Moment) => {
        this.props.handleEndDateChange && this.props.handleEndDateChange(date);
    };
}

export const SearchBar = withStyles(styles, {withTheme: true})(SearchBarComponent);
