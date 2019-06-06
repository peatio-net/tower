import {createStyles, WithStyles} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import * as React from 'react';

const styles = () => createStyles({
    root: {
        display: 'flex',
        background: '#3598D5',
        height: '32px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 7px',
    },
    span: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '10px',
        lineHeight: 'normal',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: 'black',
        margin: '0 5px',
    },
    a: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '13px',
        lineHeight: 'normal',
        letterSpacing: '0.03em',
        textDecorationLine: 'underline',
        color: 'white',
        marginBottom: '3px',
    },
    b: {
        color: 'red',
    },
});

class FooterComponent extends React.Component<WithStyles<typeof styles>, object> {
    public render() {
        const {classes} = this.props;

        if (location.pathname.startsWith('/confirm')) {
            return <React.Fragment/>;
        }

        const startDate = process.env.BUILD_EXPIRE ? (new Date(+process.env.BUILD_EXPIRE)).getTime() : '';
        const today = new Date().getTime();

        return (
            <footer className={classes.root}>
                <span className={classes.span}>Powered by</span>
                <a className={classes.a} href="https://openware.com">openware.com</a>
                {startDate &&
                <span className={classes.span}>
                        EXPIRE IN <b className={classes.b}>
                        {Math.ceil((startDate - today) / (3600 * 1000 * 24))} days
                    </b>
                    </span>}
            </footer>
        );
    }
}

export const Footer = withStyles(styles, {withTheme: true})(FooterComponent);
