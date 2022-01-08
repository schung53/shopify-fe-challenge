import React, { Component } from 'react';
import { withStyles } from '@mui/styles';

// UI
import {IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const styles = {
    button: {
        color: '#6db9fb',
        marginTop: '-5px'
    }
}

export class LikeButton extends Component {
    constructor(){
        super();
        this.state = {
            clicked: false
        };
    };

    handleClick = () => {
        this.setState({ clicked: true });
    }

    handleUnclick = () => {
        this.setState({ clicked: false });
    }

    render() {
        const { clicked } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {clicked ?
                    <IconButton
                        onClick={this.handleUnclick}
                        className={classes.button}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    :
                    <IconButton
                        onClick={this.handleClick}
                        className={classes.button}
                    >
                        <FavoriteBorderIcon />
                    </IconButton>
                }
            </div>

        );
    }
}

export default withStyles(styles)(LikeButton);
