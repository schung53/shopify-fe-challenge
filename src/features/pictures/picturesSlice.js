import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPictures } from './picturesAPI';
import { extendLastDate, setDates } from '../dates/datesSlice';
import moment from 'moment';

const initialState = {
    pictures: [],
    loading: true,
    moreLoading: false
};

const formatResponse = (response) => {
    let formattedResponse = [];
    response.reverse().forEach((picture) => {formattedResponse.push({...picture, open: false})});
    console.log(formattedResponse);
    return formattedResponse;
};

export const fetchPicturesAsync = createAsyncThunk(
    'pictures/fetchPictures',
    async (_, { getState }) => {
        const response = await fetchPictures(getState().dates.lastDate, getState().dates.currentDate);
        return formatResponse(response);
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
        return formatResponse(response);
    }
);

export const searchDateRangeAsync = createAsyncThunk(
    'pictures/searchDateRangeAsync',
    async (dateObject, { dispatch }) => {
        const startDate = dateObject.startDate;
        const endDate = dateObject.endDate;
        dispatch(setDates({startDate, endDate}));
        const response = await fetchPictures(startDate, endDate);
        return formatResponse(response);
    }
);

export const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
        setModalOpen: (state, action) => {
            state.pictures[action.payload.index].open = action.payload.isOpen
        }
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
            })
            .addCase(searchDateRangeAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchDateRangeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.pictures = action.payload;
            })
    },
});

export const { setModalOpen } = picturesSlice.actions;

export const selectPictures = (state) => state.pictures.pictures;

export default picturesSlice.reducer;
