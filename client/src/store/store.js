// save all states in store
import { configureStore } from '@reduxjs/toolkit';
import questionSlice from '../slices/questionSlice';

const store = configureStore({
  // contain all reducers (functions that take in information about states and action that I wanna perform on that state)
  reducer: {
    question: questionSlice.reducer
  }
});

export default store;
