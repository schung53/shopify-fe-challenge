import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import datesReducer from '../features/dates/datesSlice';
import picturesReducer from '../features/pictures/picturesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dates: datesReducer,
    pictures: picturesReducer
  }
});
