import React, { Component } from 'react';
import { withStyles } from '@mui/styles';

// Redux
import { connect } from 'react-redux';
import { fetchMorePicturesAsync } from '../features/pictures/picturesSlice';

// UI
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

const styles = {
    button: {
        backgroundColor: '#6db9fb',
        color: 'black',
        width: '300px',
        margin: '20px auto auto auto'
    },
    disabled: {
        backgroundColor: '#001c33',
        color: '#6db9fb',
        width: '300px',
        margin: '20px auto auto auto'
    },
    spinner: {
        height: '10px'
    }
}

export class MoreButton extends Component {
    render() {
        const { classes, loading, fetchMorePicturesAsync } = this.props
        return (
            <div>
                {loading ?
                    <Button
                        variant="outlined"
                        startIcon={<CircularProgress className={classes.spinner}/>}
                        className={classes.disabled}
                    >
                        Deeper into the galaxy
                    </Button>
                    :
                    <Button
                        onClick={() => fetchMorePicturesAsync()}
                        variant="contained"
                        className={classes.button}
                    >
                        Deeper into the galaxy
                    </Button>
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.pictures.moreLoading
});

const mapActionsToProps = {
    fetchMorePicturesAsync
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MoreButton));
