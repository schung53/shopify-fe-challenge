import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPictures } from './picturesAPI';
import { extendLastDate } from '../dates/datesSlice';
import moment from 'moment';

const initialState = {
    pictures: [],
    loading: true,
    moreLoading: false
};

export const fetchPicturesAsync = createAsyncThunk(
    'pictures/fetchPictures',
    async (_, { getState }) => {
        const response = await fetchPictures(getState().dates.lastDate, getState().dates.currentDate);
        return response.reverse();
    }
);

export const fetchMorePicturesAsync = createAsyncThunk(
    'pictures/fetchMorePictures',
    async (_, { dispatch, getState }) => {
        let newEndDate = getState().dates.lastDate;
        newEndDate = moment(newEndDate).subtract(1, 'days').format('YYYY-MM-DD');
        dispatch(extendLastDate());
        let newStartDate = getState().dates.lastDate;
        const response = await fetchPictures(newStartDate, newEndDate);
        return response.reverse();
    }
);

export const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPicturesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPicturesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.pictures = action.payload;
            })
            .addCase(fetchMorePicturesAsync.pending, (state) => {
                state.moreLoading = true;
            })
            .addCase(fetchMorePicturesAsync.fulfilled, (state, action) => {
                state.moreLoading = false;
                state.pictures = [...state.pictures, ...action.payload];
            });
    },
});

export const selectPictures = (state) => state.pictures.pictures;

export default picturesSlice.reducer;
