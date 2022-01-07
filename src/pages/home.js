import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import PictureCard from '../components/PictureCard';

// Redux
import { connect } from 'react-redux';
import { setInitialDates } from '../features/dates/datesSlice';
import { fetchPicturesAsync, fetchMorePicturesAsync } from '../features/pictures/picturesSlice';

// UI
import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';

export class home extends Component {
    componentDidMount() {
        const { setInitialDates, fetchPicturesAsync } = this.props;
        setInitialDates();
        fetchPicturesAsync();
    }

    render() {
        const { pictures, loadingPictures, fetchMorePicturesAsync } = this.props;

        return (
            <div>
            <div>
                {loadingPictures ?
                    <CircularProgress />
                    : 
                    <>
                    <Grid container justify="center">
                        <Grid item xs={0.5} />
                        <Grid item xs={11} >
                        <Grid container justify="center">
                            {pictures.map((picture) => {
                                return (
                                    <Grid key={picture.date} item> 
                                        <PictureCard picture={picture} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                        </Grid>
                        <Grid item xs={0.5} />
                    </Grid>
                    </>
                }
            </div>
            <button 
                onClick={() => fetchMorePicturesAsync()}
            >
                More
            </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pictures: state.pictures.pictures,
    loadingPictures: state.pictures.loading
});

const mapActionsToProps = {
    setInitialDates,
    fetchPicturesAsync,
    fetchMorePicturesAsync
};

export default connect(mapStateToProps, mapActionsToProps)(home);
