import {
    ClickAwayListener,
    createStyles,
    IconButton,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    ChevronLeft,
    ChevronRight,
} from '@material-ui/icons';
// import classNames from 'classnames';
import * as React from 'react';


const styles = (theme: Theme) => createStyles({
    root: {
        zIndex: 2,
        position: 'fixed',
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    boxWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
        height: 'auto',
        maxWidth: 500,
        overflow: 'hidden',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 15px 18px 0px rgba(0,0,0,0.14), 0px 15px 14px 0px rgba(0,0,0,0.12)',
    },
    button: {
      color: '#2076D2',
      padding: '2px',
      margin: '15px',
      backgroundColor: '#fff',
    },
    icon: {
      fontSize: '18px',
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

interface Document {
    upload: {
        url: string;
    };
}

interface OwnProps {
    handleClose: () => void;
    handleNavigate: (index: number) => void;
    documents: Document[];
    documentIndex: number;
}

type Props = StyleProps & OwnProps;

class DocumentCarouselComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            handleClose,
            documents,
            documentIndex,
        } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.boxWrapper}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div className={classes.box}>
                            {this.prevButton(documentIndex - 1)}
                            <img src={documents[documentIndex].upload.url} alt="document" className={classes.img}/>
                            {this.nextButton(documentIndex + 1)}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        );
    }

    private prevButton = (index: number) => {
        const { classes } = this.props;
        return (
            <IconButton
                className={classes.button}
                onClick={this.handleClick(index)}
                disabled={index < 0}
            >
                <ChevronLeft className={classes.icon} />
            </IconButton>
        );
    };

    private nextButton = (index: number) => {
        const { classes, documents } = this.props;
        return (
            <IconButton
                className={classes.button}
                onClick={this.handleClick(index)}
                disabled={index >= documents.length}
            >
                <ChevronRight className={classes.icon} />
            </IconButton>
        );
    };

    private handleClick = (index: number) => () => {
        this.props.handleNavigate(index);
    }
}

export const DocumentCarousel = withStyles(styles)(DocumentCarouselComponent);
