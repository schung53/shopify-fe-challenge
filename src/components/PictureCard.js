import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import moment from 'moment';
import PictureModal from './PictureModal';
import LikeButton from './LikeButton';

// Redux
import { connect } from 'react-redux';
import { setModalOpen } from '../features/pictures/picturesSlice';

// UI
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import css from './PictureCard.module.css';

const styles = {
    card: {
        width: '300px',
        margin: '10px 10px 10px 10px',
        backgroundColor: '#001c33',
        borderColor: '#154169',
        borderRadius: '10px',
        justifyContent: 'center'
    },
    cardTitle: {
        color: '#6db9fb',
        padding: '7px 3px 7px 3px',
        textAlign: 'left'
    },
    titlePadding: {
        padding: '5px 8px 5px 8px'
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '96%'    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '95%',
        margin: '5px 5px 5px 5px'
    },
    cardContent: {
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: '-7px'
    },
    actionsGrid: {
        justifyContent: 'space-between',
        marginTop: '6px'
    },
    imageButton: {
        maxWidth: '96%',
        borderRadius: '7px',
        margin: '5px -5px 5px 5px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    }
};

export class PictureCard extends Component {
    handleClick() {
        const { index, setModalOpen } = this.props;
        setModalOpen({index: index, isOpen: true});
    }

    _renderCardMedia() {
        const { classes, picture } = this.props;

        if (picture.media_type === "image") {
            return (
                <button onClick={() => this.handleClick()} className={classes.imageButton}>
                    <CardMedia 
                        className={classes.cardImage}
                        component="img"
                        image={picture.url}
                        alt={picture.title}
                    />
                </button>
            );
        } else {
            return (
                <CardMedia 
                    className={classes.cardVideo}
                    component="iframe"
                    src={picture.url}
                    alt={picture.title}
                />
            );
        }
    }

    render() {
        const { classes, picture, index } = this.props;
        const humanizedDate = moment(picture.date).format("MMMM Do YYYY");

        return (
            <div>
            <Card 
                className={classes.card}
                variant='outlined'
            >
                <div className={classes.titlePadding}>
                    <Typography variant='body1' className={classes.cardTitle}>
                        {picture.title}
                    </Typography>
                </div>
                {this._renderCardMedia()}
                <CardContent
                    className={classes.cardContent}
                >
                    <Typography variant='caption' style={{color: "#6db9fb"}}>
                        {humanizedDate}
                    </Typography>
                    {" – "}
                    <Typography variant='caption'>
                        {picture.explanation.slice(0, 100).trim()}...
                    </Typography>
                    <Grid container className={classes.actionsGrid}>
                        <Grid item>
                            <LikeButton />
                        </Grid>
                        <Grid item>
                            <PictureModal index={index} picture={picture} date={humanizedDate}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
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


PictureCard.propTypes = {
    index: PropTypes.number,
    picture: PropTypes.object
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PictureCard));
