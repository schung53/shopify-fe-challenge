import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import cssStyles from './PictureModal.module.css';

// UI
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
    dialog: {
        borderRadius: '10px'
    },
    dialogTitle: {
        maxWidth: '800px',
    },
    titleGrid: {
        justifyContent: 'space-between'
    },
    dialogContent: {
        maxWidth: '800px',
        height: '1000px',
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '800px',
        margin: '5px 5px 5px 5px'
    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '800px',
        margin: '5px 5px 5px 5px'
    },
    explanation: {
        maxWidth: '780px',
        padding: '10px 10px 10px 10px'
    },
    date: {
        margin: '10px 20px 5px 10px'
    },
    dateGrid: {
        alignItems: 'center'
    },
    copyright: {
        margin: '10px auto 5px auto'
    }
};

export class PictureModal extends Component {
    constructor(){
        super();
        this.state = {
            open: false
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    _renderCardMedia() {
        const { picture } = this.props;

        if (picture.media_type === "image") {
            return (
                <img
                    src={picture.hdurl}
                    alt={picture.title}
                    style={styles.cardImage}
                />
            );
        } else {
            return (
                <iframe
                    src={picture.url}
                    alt={picture.title}
                    title={picture.title}
                    style={styles.cardVideo}
                />
            );
        }
    }

    render() {
        const { open } = this.state;
        const { classes, picture, date } = this.props;
        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                >
                    Read More
                </Button>
                <Dialog
                    open={open}
                    maxWidth='xl'
                    onClose={this.handleClose}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container className={classes.titleGrid}>
                            <Grid item>
                                {picture.title}
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        {this._renderCardMedia()}
                        <Grid container alignItems='center'>
                            <Grid item>
                                <Typography variant='body1' className={classes.date}>
                                    {date}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' className={classes.copyright}>
                                    Copyright: {" ".concat(picture.copyright)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <DialogContentText className={classes.explanation}>
                            {picture.explanation}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

PictureModal.propTypes = {
    picture: PropTypes.object,
    date: PropTypes.string
}

export default withStyles(styles)(PictureModal);
