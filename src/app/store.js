import { configureStore } from '@reduxjs/toolkit';
import datesReducer from '../features/dates/datesSlice';
import picturesReducer from '../features/pictures/picturesSlice';

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    pictures: picturesReducer
  }
});
