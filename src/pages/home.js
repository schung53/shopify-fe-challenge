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
import { Typography } from '@mui/material';

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
                            <Grid container>
                                <Grid item>
                                    <Typography variant='h3' style={{margin: '20px auto auto 15px'}} color='#6db9fb'>
                                        Spacestagram
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant='body2' style={{margin: '10px auto 20px 15px'}} color='#6db9fb'>
                                        Brought to you by NASA's Astronomy Picture of the Day (APOD) API
                                    </Typography>
                                </Grid>
                            </Grid>
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
                <Typography variant='body2' style={{margin: '20px auto 20px auto'}} color='white'>
                    Made with ♥ by James S. Chung – 2022
                </Typography>
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
