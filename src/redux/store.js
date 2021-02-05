import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './room/roomSlice';

export default configureStore({
  reducer: {
    room: roomReducer
  }
});
