import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import roomReducer from './room/roomSlice';
import roomTypeReducer from './roomType/roomTypeSlice';
import roomGroupReducer from './roomGroup/roomGroupSlice';
import buildingReducer from './building/buildingSlice';
import bookingReducer from './booking/bookingSlice';
import patientReducer from './patient/patientSlice';
import ipReducer from './ip/ipSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    room: roomReducer,
    roomType: roomTypeReducer,
    roomGroup: roomGroupReducer,
    building: buildingReducer,
    booking: bookingReducer,
    patient: patientReducer,
    ip: ipReducer,
  }
});
