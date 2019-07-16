import {
    createStyles,
    Paper,
    Popover,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    popper: {
        minWidth: 150,
        padding: '10px 0px',
    },
    info: {
        padding: '8px 20px',
    },
    title: {
        opacity: 0.54,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface PopperProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    data: JSX.Element;
}

type Props = StyleProps & PopperProps;

const PopperComponent: React.FunctionComponent<Props> = props => {
    const {
        anchorEl,
        open,
        handleClose,
        data,
        classes,
    } = props;

    const id = open ? 'simple-popper' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            className={classes.popper}
        >
            <Paper className={classes.info}>{data}</Paper>
        </Popover>
        );
};

export const InfoPopper = withStyles(styles, { withTheme: true })(PopperComponent);
