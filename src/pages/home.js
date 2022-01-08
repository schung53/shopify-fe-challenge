import React, { Component } from 'react';
import PictureCard from '../components/PictureCard';
import LoadingCard from '../components/LoadingCard';
import MoreButton from '../components/MoreButton';

// Redux
import { connect } from 'react-redux';
import { setInitialDates } from '../features/dates/datesSlice';
import { fetchPicturesAsync } from '../features/pictures/picturesSlice';

// UI
import { Grid } from '@mui/material';

export class home extends Component {
    componentDidMount() {
        const { setInitialDates, fetchPicturesAsync } = this.props;
        setInitialDates();
        fetchPicturesAsync();
    }

    render() {
        const { pictures, loadingPictures } = this.props;
        const loadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        return (
            <div>
                <div>
                    <Grid container justify="center">
                        <Grid item xs={0.5} />
                        <Grid item xs={11} >
                            <Grid container justify="center">
                                {loadingPictures ?
                                    <>
                                        {loadingArray.map((num) => {
                                            return (
                                                <Grid key={num} item> 
                                                    <LoadingCard />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        {pictures.map((picture) => {
                                            return (
                                                <Grid key={picture.date} item> 
                                                    <PictureCard picture={picture} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} />
                    </Grid>
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
