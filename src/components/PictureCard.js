import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

// UI
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';

const styles = {
    card: {
        width: '300px',
        margin: '10px 10px 10px 10px',
        backgroundColor: '#001c33',
        borderColor: '#154169',
        borderRadius: '10px'
    },
    cardHeader: {
        color: '#6db9fb',
        padding: '7px 3px 7px 3px'
    },
    cardImage: {
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

                    <Typography variant='h6' className={classes.cardHeader}>
                        {picture.title}
                    </Typography>

                <CardMedia 
                    className={classes.cardImage}
                    component="img"
                    image={picture.url}
                    alt={picture.title}
                />
                <CardContent
                    className={classes.cardContent}
                >
                    <Typography variant='body2'>
                        {picture.explanation.slice(0, 100)}...
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
