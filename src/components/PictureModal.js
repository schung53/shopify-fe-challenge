import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import './PictureModal.module.css';

// Redux
import { connect } from 'react-redux';
import { setModalOpen } from '../features/pictures/picturesSlice';


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
    button: {
        backgroundColor: '#001c33'
    },
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
        maxWidth: '795px',
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

    handleOpen = () => {
        const { index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: true });
    };

    handleClose = () => {
        const { index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: false });
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
        const { classes, picture, pictures, date, index } = this.props;
        return (
            <div>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={this.handleOpen}
                    className={classes.button}
                >
                    Read More
                </Button>
                <Dialog
                    open={pictures[index].open}
                    maxWidth='xl'
                    onClose={this.handleClose}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container className={classes.titleGrid}>
                            <Grid item style={{marginLeft: "10px"}}>
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

const mapStateToProps = (state) => ({
    pictures: state.pictures.pictures
})

const mapActionsToProps = {
    setModalOpen
};

PictureModal.propTypes = {
    picture: PropTypes.object,
    date: PropTypes.string
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PictureModal));
