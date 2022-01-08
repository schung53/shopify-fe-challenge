import React, { Component } from 'react';
import PictureCard from '../components/PictureCard';
import MoreButton from '../components/MoreButton';

// Redux
import { connect } from 'react-redux';
import { setInitialDates } from '../features/dates/datesSlice';
import { fetchPicturesAsync } from '../features/pictures/picturesSlice';

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
        const { pictures, loadingPictures } = this.props;

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
            <MoreButton />
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
    fetchPicturesAsync
};

export default connect(mapStateToProps, mapActionsToProps)(home);
