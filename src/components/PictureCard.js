import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import moment from 'moment';
import PictureModal from './PictureModal';

// UI
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';

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
        maxWidth: '96%',
        margin: '5px 5px 5px 5px'
    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '95%',
        margin: '5px 5px 5px 5px'
    },
    cardContent: {
        color: '#ffffff',
        textAlign: 'left'
    }
};



export class PictureCard extends Component {
    _renderCardMedia() {
        const { classes, picture } = this.props;

        if (picture.media_type === "image") {
            return (
                <CardMedia 
                    className={classes.cardImage}
                    component="img"
                    image={picture.url}
                    alt={picture.title}
                />
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
        const { classes, picture } = this.props;
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
                    <PictureModal picture={picture} date={humanizedDate}/>
                </CardContent>
            </Card>
            </div>
        );
    }
}

PictureCard.propTypes = {
    picture: PropTypes.object
}

export default withStyles(styles)(PictureCard);
