import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import moment from 'moment';

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
        padding: '5px 5px 5px 5px'
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '96%',
        margin: '5px 5px 5px 5px'
    },
    cardContent: {
        color: '#ffffff',
        textAlign: 'left'
    }
};

export class PictureCard extends Component {
    render() {
        const { classes, picture } = this.props;
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
                <CardMedia 
                    className={classes.cardImage}
                    component="img"
                    image={picture.url}
                    alt={picture.title}
                />
                <CardContent
                    className={classes.cardContent}
                >
                    <Typography variant='caption' style={{color: "#6db9fb"}} fullWidth>
                        {moment(picture.date).format("MMMM Do YYYY")}
                    </Typography>
                    {" – "}
                    <Typography variant='caption'>
                        {picture.explanation.slice(0, 100).trim()}...
                    </Typography>
                </CardContent>
            </Card>
            </div>
        )
    }
}

PictureCard.propTypes = {
    picture: PropTypes.object
}

export default withStyles(styles)(PictureCard);
