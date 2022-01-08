import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
    currentDate: '',
    lastDate: ''
};

export const datesSlice = createSlice({
    name: 'dates',
    initialState,
    reducers: {
        setInitialDates: (state) => {
            state.currentDate = moment().format('YYYY-MM-DD');
            state.lastDate = moment().subtract(10, 'days').format('YYYY-MM-DD');
        },
        extendLastDate: (state) => {
            state.lastDate = moment(state.lastDate).subtract(10, 'days').format('YYYY-MM-DD');
        },
        setDates: (state, action) => {
            state.currentDate = action.payload.endDate;
            state.lastDate = action.payload.startDate;
        }
    }
});

export const selectCurrentDate = (state) => state.dates.currentDate;
export const selectLastDate = (state) => state.dates.lastDate;

export const { setInitialDates, extendLastDate, setDates } = datesSlice.actions;

export default datesSlice.reducer;