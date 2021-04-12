import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './room/roomSlice';
import roomTypeReducer from './roomType/roomTypeSlice';
import roomGroupReducer from './roomGroup/roomGroupSlice';
import buildingReducer from './building/buildingSlice';
import bookingReducer from './booking/bookingSlice';
import patientReducer from './patient/patientSlice';
import ipReducer from './ip/ipSlice';
import userReducer from './user/userSlice';

export default configureStore({
  reducer: {
    room: roomReducer,
    roomType: roomTypeReducer,
    roomGroup: roomGroupReducer,
    building: buildingReducer,
    booking: bookingReducer,
    patient: patientReducer,
    ip: ipReducer,
    user: userReducer,
  }
});
