import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './room/roomSlice';
import roomTypeReducer from './roomType/roomTypeSlice';
import roomGroupReducer from './roomGroup/roomGroupSlice';
import buildingReducer from './building/buildingSlice';

export default configureStore({
  reducer: {
    room: roomReducer,
    roomType: roomTypeReducer,
    roomGroup: roomGroupReducer,
    building: buildingReducer,
  }
});
