import {
    Button,
    createStyles,
    Grid,
    Modal,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    paper: {
        display: 'block',
        margin: '100px auto',
        width: '360px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 312,
    },
    menu: {
        width: 400,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface EditLabelProps {
    modalClose: () => void;
    open: boolean;
    editLabel: (key: string, value: string, scope: string) => void;
    name: string;
    value: string;
    scope: string;
    handleChangeLabelName: (name: string) => void;
    handleChangeLabelValue: (value: string) => void;
    handleChangeLabelScope: (scope: string) => void;
}

type Props = StyleProps & EditLabelProps;

const scopeTypes = [
    {
        value: 'Public',
        key: 'public',
    },
    {
        value: 'Private',
        key: 'private',
    },
];

class EditLabelModal extends React.Component<Props> {
    public render() {
        const {
            classes,
            name,
            value,
            scope,
        } = this.props;

        return (
            <Modal
                open={this.props.open}
                onClose={this.handleClose}
                onKeyPress={this.handleEnterPress(name, value, scope)}
            >
                <Grid container={true} direction={'column'} className={classes.paper}>
                    <Grid item={true}>
                        <Typography variant="h5" component="h5" className={classes.textField}>
                            Edit Label
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Key"
                            value={name}
                            onChange={this.handleChangeName}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            required={true}
                            id="standard-required"
                            label="Value"
                            value={value}
                            onChange={this.handleChangeValue}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            select={true}
                            value={scope}
                            label="Scope"
                            className={classes.textField}
                            onChange={this.handleChangeScope}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {scopeTypes.map(option => (<option key={option.key} value={option.key}>{option.value}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item={true}>
                        <Grid container={true} justify={'flex-end'} spacing={8} style={{ marginTop: 20 }}>

                            <Grid item={true}>
                                <Button onClick={e => this.cancelEditingLabel()}>
                                    <Typography variant="h6" component="h6" style={{ color: '#3598D5' }}>
                                        CANCEL
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item={true}>
                                <Button onClick={e => this.editLabel(name, value, scope)}>
                                    <Typography variant="h6" component="h6" style={{ color: '#3598D5' }}>
                                        OK
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        );
    }

    // tslint:disable-next-line:no-any
    private handleChangeName = (e: any) => {
        this.props.handleChangeLabelName(e.target.value.toLowerCase());
    };

    // tslint:disable-next-line:no-any
    private handleChangeValue = (e: any) => {
        this.props.handleChangeLabelValue(e.target.value.toLowerCase());
    };

    // tslint:disable-next-line:no-any
    private handleChangeScope = (e: any) => {
        this.props.handleChangeLabelScope(e.target.value);
    };

    private handleClose = () => {
        this.props.modalClose();
    };

    private handleEnterPress = (key: string, value: string, scope: string) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && key.length && value.length) {
            event.preventDefault();
            this.editLabel(key, value, scope);
        }
    };

    private editLabel = (key: string, value: string, scope: string) => {
        this.props.editLabel(key, value, scope);
        this.handleClose();
    };

    private cancelEditingLabel = () => {
        this.props.handleChangeLabelName('');
        this.props.handleChangeLabelValue('');
        this.handleClose();
    };
}

export const EditLabel = withStyles(styles)(EditLabelModal);
