import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

// UI
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';

const styles = {
    card: {
        width: '300px',
        margin: '10px 10px 10px 10px',
        backgroundColor: '#000000'
    },
    cardImage: {
    }
};

export class PictureCard extends Component {
    render() {
        const { classes, picture } = this.props;
        return (
            <div>
            <Card className={classes.card}>
                <CardHeader
                    title={picture.title}
                    subheader={picture.date}
                />
                <CardMedia 
                    className={classes.cardImage}
                    component="img"
                    image={picture.url}
                    alt={picture.title}
                />
                <CardContent>
                    {picture.explanation.slice(0, 100)}
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
